# Yoorello: Command Your Tasks
[**Yoorello To-Do 보드**](https://yoorello.netlify.app/) <br>
react-beautiful-dnd 라이브러리를 사용하여 구현한 Trello 스타일의 To-do 보드입니다. 이 보드는 사용자가 할 일을 보드에 추가하고, 이동하며, 관리하는 데 도움을 줍니다.

<img width="1543" alt="Yoorello" src="https://github.com/yoohaaeun/Yoorello/assets/101792909/b1577657-43a3-4bf4-a4da-0efa4788db70">

<br>


## 주요기능
- **React-beautiful-dnd 라이브러리를 활용한 드래그 앤 드롭 기능 구현**
    - 할 일 카드와 보드의 직관적인 이동과 재정렬을 지원하기위해 React-beautiful-dnd 라이브러리를 적용했습니다.
- **렌더링 성능 최적화를 위한 React.memo 사용**
    - 드래그 앤 드롭 동작 시 불필요한 렌더링을 최소화하기 위해 React.memo를 적용했습니다. 특히, 특정 카드를 이동할 때 전체 리스트를 다시 그리는 것이 아니라 해당 카드의 이동에 필요한 부분만 업데이트하여 성능을 최적화했습니다.
- **전역 상태 관리를 위한 Recoil 라이브러리 사용**
    - 각 카드와 보드의 상태를 다양한 컴포넌트에서 필요로 했기 때문에 전역적으로 데이터를 관리하기 위해  Recoil 라이브러리를 도입했습니다. 전역 상태로 관리함으로써 컴포넌트 간의 데이터 전달이 간편해지며, 코드의 가독성과 유지보수성을 향상시켰습니다.
- **데이터 저장을 위한 LocalStorage 활용**
    - LocalStorage를 활용하여 사용자가 기존에 추가하거나 수정한 할 일 카드와 보드 정보를 브라우저에 저장하여, 새로 고침이나 페이지 이동 시에도 데이터를 유지했습니다.
- **다크 모드 테마 구현**
    - 사용자에게 시각적 선택을 제공하고, 다크 모드 테마를 적용하여 사용자가 원하는 환경에서 애플리케이션을 이용할 수 있도록 했습니다.

<br>

## 기술 스택
- TypeScript
- React
- Recoil
- Styled-Components
- Netlify
