# Node.js를 설치한 베이스 이미지를 선택합니다.
FROM node:14

# 애플리케이션 디렉토리를 생성합니다.
WORKDIR /usr/src/app

# 애플리케이션 의존성을 설치하기 위한 파일들을 복사합니다.
COPY package*.json ./

# 애플리케이션 의존성을 설치합니다.
RUN npm install

# 애플리케이션 소스를 복사합니다.
COPY . .

# 애플리케이션을 빌드합니다.
RUN npm run build
