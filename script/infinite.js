const sec03Elem = document.querySelector("#section-3");

const sec03_slideInit = () => {
  // --- 앞/뒤 복제 슬라이드 ---
  const cardView = sec03Elem.querySelector(".card-view");
  const cardList = sec03Elem.querySelector(".card-list");
  let cards = cardList.querySelectorAll("li");
  const imgSize = cardList.length;
  const totalSize = imgSize + 2;
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  cardList.append(firstClone);
  cardList.prepend(lastClone);

  // --- 시작 위치 설정 ---
  const IMG_WIDTH = 300;
  const TOTAL_SIZE = cardList.children.length;
  const VIEW_COUNT = Math.floor(sec03Elem.clientWidth / IMG_WIDTH);
  let current = 1;

  // --- 이전/다음 버튼 ---
  const prevbtn = sec03Elem.querySelector(".prev");
  const nextbtn = sec03Elem.querySelector(".next");

  prevbtn.addEventListener("click", () => {
    current--;
  });
  nextbtn.addEventListener("click", () => {
    current++;
  });

  // --- 트렌지션 순간 점프 ---
  if (current === totalSize - 1) {
    current = 1;
  }
  if (current === 0) {
    current = totalSize - 2;
  }
};
sec03_slideInit();

// 앞/뒤 복제 슬라이드 추가
// 시작위치를 설정
// 이전버튼/ 다음버튼 처리
// 버튼 클릭 시 트렌지션이 끝나면 순간 점프