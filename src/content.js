const groundContent = [
  {
    id: 1,
    groundId: 0,
    userId: 1,
    content: "저희집 첫째 뽀떼냥이 '앵고'입니다!",
    image: 'https://i.pinimg.com/564x/04/bb/ac/04bbacb21948668c6a4ef9e36acb098e.jpg',
    date: '2024-07-31T10:00:00Z',
    parentId: null
  },
  {
    id: 2,
    groundId: 0,
    userId: 2,
    content: "너무 귀여워요!",
    image: null,
    date: '2024-07-31T12:00:00Z',
    parentId: 1
  },
  {
    id: 3,
    groundId: 0,
    userId: 3,
    content: "앵고의 눈빛이 너무 멋져요!",
    image: null,
    date: '2024-07-31T13:00:00Z',
    parentId: 1
  },
  {
    id: 4,
    groundId: 0,
    userId: 1,
    content: "감사합니다!!💕",
    image: null,
    date: '2024-08-01T13:00:00Z',
    parentId: 3
  },
  {
    id: 5,
    groundId: 0,
    userId: 3,
    content: '오늘의 감자 간식은 바로 이것!',
    image: 'https://i.pinimg.com/564x/e9/0c/ec/e90cecf418f63e904ee3c077f5f16e0e.jpg',
    date: '2024-08-01T10:00:00Z',
    parentId: null
  },
  {
    id: 6,
    groundId: 1,
    userId: 4,
    content: '우리 초코의 하루!',
    image: 'https://i.pinimg.com/564x/b8/9f/e4/b89fe471c41e16afbdc7a14530ecbcb0.jpg',
    date: '2024-08-01T10:00:00Z',
    parentId: null
  },
  {
    id: 7,
    groundId: 2,
    userId: 2,
    content: '우리 집 강아지 오늘의 순간',
    image: 'https://i.pinimg.com/564x/4b/20/b3/4b20b3fcca03cd6c0e51cd9c4f76285d.jpg',
    date: '2024-07-31T14:30:00Z',
    parentId: null
  },
  {
    id: 8,
    groundId: 3,
    userId: 3,
    content: `📉트래픽 꺾인 알리, 테무의 한국 시장 분투기
              두 플랫폼의 서로 다른 전략으로 인한 차이가 벌어지고 있습니다

              👆원문 보러가기: https://contents.premium.naver.com/connectx/us/contents/240802115812316gd

              [아티클 3문장 요약📑]

              1️⃣  불과 몇 달 전만 해도, 국내 이커머스 시장을 완전히 잡아먹을 것만 같던 알리익스프레스(이하 알리)와 테무, 하지만 최근에는 이들의 트래픽 성장세가 꺾이면서 한계를 보인다는 평가가 주로 나오고 있는데, 가장 많이 언급되고 있는 MAU(월간 활성 사용자 수) 기준으로는 분명 정점에 도달한 이후 하락하는 추세임은 분명해 보입니다.

              2️⃣ 하지만 사용자의 방문 빈도를 직관적으로 보여주는 고착도 지표(DAU/MAU)의 경우, 알리는 하락 중이지만 테무는 오히려 상승하고 있으며, 1인당 평균 사용 시간도 동일한 추세를 보이고 있어서, 더 자주 그리고 오래 방문하게 만들어 구매 전환을 만들어 낸다는 발견형 쇼핑에 걸맞는 성과를 내는 건 알리보다는 테무로 보입니다.

              ※ 고착도(DAU/MAU): 일간 활성 사용자 수를 월간 활성 사용자 수로 나눈 지표로 사용자의 방문 빈도를 직관적으로 보여줍니다. 예를 들어 소셜 미디어 서비스나 게임 같은 경우 일반적으로 해당 지표가 약 50% 내외라 하는데, 이는 이틀에 한 번 꼴로 서비스에 방문한다는 걸 뜻합니다.

              3️⃣ 이러한 차이가 발생한 건, 본인들의 비즈니스가 한계가 있다는 걸 안 알리는 한국 셀러를 대거 유치하고 배송 서비스를 강화한 반면, 테무는 별다른 투자 없이 본연의 강점인 중국 직구 상품에 집중했기 때문으로, 다만 나름 긍정적이라 평가할만한 테무마저 구매 전환 효율이 너무 낮아 아직은 국내 이커머스 업계 전체를 뒤흔들기엔 역부족인 상황이며, 과연 추가적인 투자를 통해 이를 타개하려 할지 아니면 현재 수준에 만족할지는 앞으로 두고 봐야 할 것 같네요.

              💡기묘한 관점➕
              알리와 테무의 최근 실적은 하락세가 맞긴 합니다. 하지만 동시에 허수 방문자가 줄고, 진성 사용자만 남는 과정이라 봐도 될 정도로 세부 지표 자체는 오히려 더 좋아지고 있기도 한데요. 특히 알리와 달리 테무는 그런 경향이 상당히 강합니다. 따라서 어쩌면 부풀려졌던 방문자 규모가 정상화되는 과정이라 볼 수도 있을 겁니다.

              그렇기에 과거처럼 C커머스가 엄청난 위협이 될 거라고 해석하는 것도, 그렇다고 찻잔 속의 태풍으로 그칠 거라 결론을 내리기도 아직은 너무 이릅니다. 현재의 숨 고르기가 어느 정도 마무리 된 이후 이들의 행보를 봐야 어떤 결론을 내릴 수 있을 것 같은데요. 특히 최근 티몬과 위메프로 인해 시장 전체가 뒤숭숭한 상황이라, 추가적인 변화가 일어날 가능성도 염두에 두고 계속 지켜봐야 할 것 같습니다.

              🥤트렌드라이트 구독하기: https://bit.ly/3NYVaRM`,
    image: 'https://i.pinimg.com/564x/69/af/45/69af4515db9baa1c3d6f4a0c409d432b.jpg',
    date: '2024-07-29T10:00:00Z',
    parentId: null
  },
  {
    id: 9,
    groundId: 3,
    userId: 4,
    content: "화이팅! 오늘도 좋은 하루 보내세요!",
    image: null,
    date: '2024-07-29T11:00:00Z',
    parentId: null
  },
  {
    id: 10,
    groundId: 3,
    userId: 2,
    content: "응원합니다!",
    image: null,
    date: '2024-07-29T11:30:00Z',
    parentId: 8
  }
];

export default groundContent;
