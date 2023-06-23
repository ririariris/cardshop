import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from redis_util import create_redis_client
from crawler import scrape_cards
import os
from dotenv import load_dotenv
from typing import Optional
from crawler_ws import get_unique_versions

load_dotenv()

if __name__ == "__main__":
    host = os.getenv("HOST")
    uvicorn.run("app:app", host=host, port=8000, reload=True)

app = FastAPI()

# CORS 정책 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_client = create_redis_client()

@app.get("/search")
def search_cards(tcg: str, rarity: str, booster: str, num: Optional[str] = None):
    # Redis에서 캐시된 데이터 확인
    cache_key = f"tcg:{tcg}:num:{num}:rarity:{rarity}:booster:{booster}"
    cached_data = redis_client.get(cache_key)
    if cached_data:      
        # 캐시된 데이터가 존재하는 경우, 해당 데이터 반환
        decoded_data = cached_data.decode('utf-8')
        decoded_data = json.loads(decoded_data)
        return decoded_data 

    # 웹 페이지 크롤링
    if num is not None:
        url = f'https://yuyu-tei.jp/game_{tcg}/sell/sell_price.php?ver={booster}{num}'
    else:
        url = f'https://yuyu-tei.jp/game_{tcg}/sell/sell_price.php?ver={booster}'
    results = scrape_cards(url, rarity, tcg)

    # 결과를 Redis에 캐시 저장
    redis_client.set(cache_key, json.dumps(results, ensure_ascii=False))
    
    return results

@app.get("/versions")
def get_versions():
    # 웹 페이지 크롤링을 위한 버전 리스트 가져오기
    ver_list = get_unique_versions("https://yuyu-tei.jp/game_ws/sell/cardlist.php")
    
    return {"versions": ver_list}