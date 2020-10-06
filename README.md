> ## EDU SSAFY 강의자료 다운로더
>
> 설명서

#### 초기세팅

웹 실습때랑 동일하게 VScode랑 Node.js 사용하시면 됩니다.

압축 해제한 폴더에서 `npm init`, `npm i puppeteer` 두개만 진행해주세요.



#### 세팅

1. 로그인 설정

강의자료를 다운로드 하려면 먼저 에듀싸피에 로그인을 해야합니다.

24라인에 있는 page.evaluate 안에 아이디(이메일), 비밀번호를 하드코딩 해주세요.

```javascript
await page.evaluate(() => {
    document.querySelector("#userId").value = "여기에 에듀싸피 아이디를 입력하세요";
    document.querySelector("#userPwd").value = "여기에 에듀싸피 비밀번호를 입력하세요";
    document.querySelector("#wrap > div > div > div.section > form > div > div.field-set.log-in > div.form-btn > a").click();
});
```

2. 다운로드 받을 강의자료 정보 가져오기

강의자료 정보는 교재가 총 몇 페이지까지 있는지와 원본 이미지 파일의 URL입니다.

지금까지 올라온 강의교재의 페이지, 원본URL은 original_link.txt파일에 정리해두었습니다.

![](https://github.com/kusakina0608/SSAFY-Ebook/blob/master/assets/scr01.PNG?raw=true)

DIR을 보고 원하는 강의자료를 찾아서 아래로 3줄을 복사하세요.

![](https://github.com/kusakina0608/SSAFY-Ebook/blob/master/assets/scr02.PNG?raw=true)

ebook.js에 붙여넣으세요(2~4 라인)



#### 사용법

terminal에서 아래 명령어 실행

``` shell
node ebook
```

시간이 조금 지나면 다운로드가 완료됩니다.



---



#### 새로 올라온 강의자료 정보 받아오는 법

다운로드 받고 싶은 강의자료를 열고 개발자 도구를 실행해 주세요.

![](https://github.com/kusakina0608/SSAFY-Ebook/blob/master/assets/screen01.PNG?raw=true)

네트워크 탭으로 이동하세요.

![](https://github.com/kusakina0608/SSAFY-Ebook/blob/master/assets/screen02.PNG?raw=true)

개발자 도구의 네트워크 탭을 켜놓고 페이지를 뒤로 파바바박 넘기다보면 강의자료 원본 이미지파일을 불러오는 패킷이 잡힙니다.

![](https://github.com/kusakina0608/SSAFY-Ebook/blob/master/assets/screen03.PNG?raw=true)

page-09.... .jpg 패킷들이 강의자료입니다. 아무거나 클릭하세요.

![](https://github.com/kusakina0608/SSAFY-Ebook/blob/master/assets/screen04.PNG?raw=true)

Request URL의 선택된 부분이 파일을 식별하는 부분이고, 뒤쪽이 페이지 번호와 확장자입니다. 크롤링 할 때는 앞부분만 필요합니다. 복사해주세요.

방금 복사한 부분이 original_link.txt에 있는 BASE_URL 입니다.

```javascript
const DIR = "ebook 폴더 안에 이미지가 저장될 폴더를 하나 만들고 해당 폴더명을 여기에 넣어주세요"
const MAX_PAGE = // 여기에 페이지 수를 입력하세요
const BASE_URL = "여기에 붙여넣으세요";
```

실행하세요

```shell
node ebook
```

다운됩니다.