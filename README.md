# 🐥 투게더뷰

투게더뷰는 모두 함께 준비하는 기술 면접 대비 플랫폼입니다.

## ✍️ㅤ투게더뷰가 제공하는 기능

- 나만의 모의 면접 진행하기
  - 나의 지원 직군과 주기술을 토대로 최대 10개의 면접 질문이 제공되어요
- 다른 사람들이 등록한 면접 예상 질문 확인하기  
  - 면접 예상 질문에 대한 답변을 공유할 수 있어요
  - 좋은 질문이라면 추천할 수 있어요
- 면접 예상 질문을 등록하기

## 🖥ㅤ로컬에서 프로젝트 실행하기

1. 이 프로젝트를 클론합니다.
2. 클론한 프로젝트 root에서 `npm install`을 실행합니다.
3. `npm run dev`를 실행합니다.
4. 브라우저에서 http://localhost:3000 을 확인합니다.

## 👥ㅤ협업 방식

1. 깃허브 프로젝트 보드에 할 일 카드를 추가합니다.
2. 현재 작업 중인 카드를 할 일에서 진행중으로 이동합니다.
3. 카드에 대한 이슈를 생성합니다.  
    - 이슈의 내용에 해당 카드에서 구현해야 하는 기능을 작성합니다.
    - Assignee를 등록합니다.
4. 새로운 브랜치를 생성합니다.
    - 브랜치 이름은 `[작업 종류]/[작업 내용]` 형식을 따릅니다.
    - 작업 종류: feature / fix / design / docs ...
5. 하나의 작은 작업을 마쳤다면 커밋합니다.
    - 커밋 이름은 `[작업 종류]: [작업 내용]` 형식을 따르며, 작업 내용은 한글로 작성해도 괜찮습니다.
    - [좋은 git commit 메시지를 위한 영어 사전](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)
6. 계획한 모든 작업을 마쳤다면 Pull Request를 만듭니다.
    - 해당 PR에서 한 일, 스크린샷, 버그 수정이라면 어떤 문제가 발생했고 어떻게 해결했는지를 내용에 작성합니다.
    - 3번에서 만든 이슈를 연결합니다.
    - Asignee에 본인을 등록합니다.

## 🛠ㅤ사용 중인 기술

- React.js & Next.js
  - 함수형 컴포넌트 사용
- Typescript
- SCSS
- antd
- ESLint & Prettier
