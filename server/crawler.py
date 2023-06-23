import requests
from bs4 import BeautifulSoup
from translation import translate_text

def scrape_website(url):
    response = requests.get(url)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup

def scrape_cards(url, rarity, tcg):
    soup = scrape_website(url)
    cards = soup.find_all('li', class_=f'card_unit rarity_{rarity}')
    results = []

    for card in cards:
        name = card.find('p', class_='name').text.strip()
        translations = translate_text(name)
        prices = card.find_all('p', class_='price')
        price = prices[-1].text.strip() if len(prices) > 1 else prices[0].text.strip()
        stock = card.find('p', class_='stock').text.strip().replace('残：', '')
        image_url = card.find('img')['src']
        image_url = image_url.replace(f'/card_image/{tcg}/90_126/', f'/card_image/{tcg}/front/')
        results.append({'카드 이름': translations, '가격': price, '재고': stock, '이미지 URL': image_url})

    return results