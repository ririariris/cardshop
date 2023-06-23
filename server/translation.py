import requests

def translate_text(text: str) -> str:
    api_key = "AIzaSyCl29nYhpqdJY97F0JgxpUIZAprbavp-v4"
    url = f"https://translation.googleapis.com/language/translate/v2?key={api_key}"
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'q': text,
        'source': 'ja',
        'target': 'ko'
    }
    translation_response = requests.post(url, headers=headers, json=data)
    translation_data = translation_response.json()
    translations = translation_data['data']['translations'][0]['translatedText']
    return translations
