### 굿즈 매장 사이트 크롤링 연습
유유테이 매장(https://yuyu-tei.jp) 을 BeautifulSoup로 크롤링 하여
fastapi로 api요청을 할 수 있도록 함

### Redis DB 사용
램 메모리에 저장하는 것으로
이미 조회된 데이터는 변동이 없으면
빠르게 랜더링 가능

### 파일을 나누어 코드 간소화
##### app.py
fastapi로 서버를 구동하는 파이썬 파일

##### crawler.py
데이터를 크롤링히여 원하는 형식에 맞게
전처리하는 파이썬 파일

##### translation.py
크롤링한 데이터를 받아 네이버 api로
번역을 해주는 파이썬 파일

##### redis_util.py
redis 데이터베이스와 연동할 수 있게
하는 파이썬 파일

### 사용된 모듈
##### requests, bs4
크롤링 하기 위하여 사용됨

##### dotenv
암호화를 위해 사용됨

###### .env 파일 내용
host=[IPv4 주소값]
ALLOWED_ORIGINS=http://[고정 IP주소값]:3000,http://localhost:3000

host는 fastapi의 서버를 담당
ALLOWED_ORIGINS는 특정 IP의 cors를 해제할 수 있도록 제어함

##### redis
redis 데이터 베이스 연동을 위해 사용됨
##### fastapi, uvicorn
fastapi 서버를 열기 위해 사용됨
