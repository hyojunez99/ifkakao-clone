// --- #section-3 전체 가져오기 ---
const sec03Elem = document.querySelector("#section-3");
// --- 함수 선언 ---
const sec03_slideInit = () => {
  // 카드 이미지 width size
  const IMG_WIDTH = 300;
  // --- card-list ---
  let current = 0;
  const cardListElem = sec03Elem.querySelector(".card-list");
  // card-list의 갯수
  const TOTAL_SIZE = cardListElem.children.length;
  // 한 페이지에 보이는 카드의 개수 : Math.floor(전체/300)
  const VIEW_COUNT = Math.floor(sec03Elem.clientWidth / IMG_WIDTH);

  // --- 공통 함수 선언 ---
  const listGoto = () => {
    cardListElem.style.transition = "0.5s";
    cardListElem.style.transform = `translateX(-${current * IMG_WIDTH}px)`;
  };
  // 1. 왼쪽 버튼, 오른쪽 버튼을 클릭했을 때 요소 가져오기
  // ( document 대신 sec03Elem  영역을 가져왔기 때문에 )

  // --- 버튼 영역 ---
  const prevBtn = sec03Elem.querySelector(".prev");
  const nextBtn = sec03Elem.querySelector(".next");

  // --- 클릭 ---
  prevBtn.addEventListener("click", () => {
    current--;
    if (current <= 0) current = 0;
    listGoto();
  });
  nextBtn.addEventListener("click", () => {
    //왼쪽 방향으로 card-list가 IMG_WIDTH값만큼 (-300)이동
    current++;
    const MAX = TOTAL_SIZE - VIEW_COUNT;
    // if (current >= TOTAL_SIZE-1) {
    //   current = TOTAL_SIZE-1;
    // }
    if (current >= MAX) {
      current = MAX;
    }
    listGoto();
  });
};
// --- 함수 호출 ---
sec03_slideInit();
