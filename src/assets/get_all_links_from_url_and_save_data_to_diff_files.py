import unicodedata
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import json
import pandas as pd
import requests
import re


################## CREATE FILE WITH LINKS
def createFileWithLinks():
    req = Request(
        "https://en.wikipedia.org/wiki/Category:Visa_requirements_by_nationality"
    )
    html_page = urlopen(req)

    soup = BeautifulSoup(html_page, "lxml")

    data = {}
    links = []
    code = 1

    for link in soup.findAll("a"):
        links.append(link.get("href"))

    links = set(links)
    print(len(links))

    for i in sorted(links):
        if i.startswith("/wiki/Visa_requirements"):
            data[re.split(r"(_)", i)[6]] = f"https://en.wikipedia.org{i}"
            code += 1

    json_data = json.dumps(dict(sorted(data.items(), key=lambda x: x[1])))
    with open("links.json", "w") as outfile:
        outfile.write(json_data)

    print(json_data)


################## TABLE FOR ONE PAGE
def getOneCountryData(code, link):
    response = requests.get(link).text

    soup = BeautifulSoup(response, "lxml")
    table = soup.find("table", {"class": "wikitable"})
    clean_data = unicodedata.normalize("NFKD", str(table))

    try:
        df = pd.read_html(str(clean_data))
        # convert list to dataframe
        df = pd.DataFrame(df[0])
        # print(df.head(5))
        saveFile(code, df)

    except ValueError:
        return


################## SAVE DATA TO FILE
def saveFile(code, df):
    with open(f"{code}.json", "w") as outfile2:
        outfile2.write(json.dumps(json.loads(df.to_json(orient="records"))))


# with open("links.json", encoding="utf-8-sig") as json_file:
#     countries = json.load(json_file)
#     for code, link in countries.items():
#         print(code)
#         getOneCountryData(code, link)


################# OPEN JSON AND ADD DATA
def openAndAddData(filename, data):
    with open(f"{filename}.json", encoding="utf-8-sig") as json_file:
        countries = json.load(json_file)
        for country in countries:
            country["link"] = data


def getOneCountryData2(code, link):
    response = requests.get(link).text

    soup = BeautifulSoup(response, "lxml")
    table = soup.findAll("table", {"class": "wikitable"})
    clean_data = unicodedata.normalize("NFKD", str(table[1]))

    try:
        df = pd.read_html(str(clean_data))
        # convert list to dataframe
        df = pd.DataFrame(df[0])
        # print(df.head(5))
        saveFile(code, df)

    except ValueError:
        return

getOneCountryData2("SGP", "https://en.wikipedia.org/wiki/Visa_requirements_for_Singaporean_citizens")
getOneCountryData2("CHN", "https://en.wikipedia.org/wiki/Visa_requirements_for_Chinese_citizens_of_Macau")