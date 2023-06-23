import requests
from bs4 import BeautifulSoup
from collections import OrderedDict

def get_unique_versions(url):
    # HTTP GET 요청
    response = requests.get(url)

    # BeautifulSoup 객체 생성
    soup = BeautifulSoup(response.text, "html.parser")
    li_elements = soup.select("ul.nav_list_third li")

    # ver 값들을 담을 리스트 초기화
    ver_list = []

    # 각 <li> 요소에서 ver 값 추출하여 리스트에 추가
    for li in li_elements:
        link = li.find("a", href=True)
        if link is not None:
            href = link["href"]
            ver_value = href.split("ver=")
            if len(ver_value) > 1:
                ver_value = ver_value[1].split("&")[0]
                ver_list.append(ver_value)
        sub_li_elements = li.select("ul.nav_list_fourth li")
        for sub_li in sub_li_elements:
            sub_link = sub_li.find("a", href=True)
            if sub_link is not None:
                sub_href = sub_link["href"]
                sub_ver_value = sub_href.split("ver=")
                if len(sub_ver_value) > 1:
                    sub_ver_value = sub_ver_value[1].split("&")[0]
                    ver_list.append(sub_ver_value)

    # 중복 제거 및 순서 유지
    ver_list = list(OrderedDict.fromkeys(ver_list))

    return ver_list