// 전역 변수 선언
const menuBtn = document.querySelector(".menubtn");
const popupMenu = document.querySelector(".popup");
const closeBtn = document.querySelector(".menu-close");

menuBtn.addEventListener("click", () => {
  popupMenu.style.display = "block";
});
closeBtn.addEventListener("click", () => {
  popupMenu.style.display = "none";
});

// 슬라이드 처리

// 각각의 section마다 있는 slide-view
const slideViews = document.querySelectorAll(".slide-wrap");

// 각각의 view 마다 추가된 slide처리
const slideInit = (view) => {
  const slideList = view.querySelector(".slide-list");
  const slideImg = view.querySelectorAll(".slide-list > li");
  const indicator = view.querySelector(".indicator");
  const imgSize = slideImg.length;

  // indicator 생성
  slideList.style.width = `${100 * imgSize}%`;
  for (let i = 0; i < imgSize; i++) {
    const elem = document.createElement("li");
    elem.dataset.index = i;
    if (i === 0) {
      elem.className = "active";
    }
    indicator.append(elem);
  }

  // --- 1. 앞/뒤 복제 슬라이드 추가 ---
  const totalSize = imgSize + 2;
  const firstClone = slideImg[0].cloneNode(true);
  const lastClone = slideImg[imgSize - 1].cloneNode(true);
  slideList.append(firstClone);
  slideList.prepend(lastClone);

  // --- 2. width 재설정 ---
  slideList.style.width = `${100 * totalSize}%`;

  // --- 3. 시작 위치 ---
  let current = 1;
  const widthGap = 100 / totalSize;
  slideList.style.transform = `translateX(-${current * widthGap}%)`;

  // --- indicator 업데이트 ---
  const updateIndicator = () => {
    const indicators = indicator.querySelectorAll("li.active");
    indicator.classList.remove("active");
    indicator.children[current - 1].classList.add("active");
  };

  // --- 공통 이동 함수 ---
  const currentGoto = (time) => {
    slideList.style.transition = time;
    slideList.style.transform = `translateX(-${current * widthGap}%)`;
  };

  // --- Next 버튼 ---
  const nextbtn = view.querySelector(".next");
  nextbtn &&
    nextbtn.addEventListener("click", () => {
      enableButtons();
      current++;
      currentGoto("0.5s");
    });

  // --- Prev 버튼 ---
  const prevbtn = view.querySelector(".prev");
  prevbtn &&
    prevbtn.addEventListener("click", () => {
      enableButtons();
      current--;
      currentGoto("0.5s");
    });

  // --- 버튼 비활성화 ---
  const disableButtons = () => {
    if (prevbtn) {
      prevbtn.style.pointerEvents = "none";
    }
    if (nextbtn) {
      nextbtn.style.pointerEvents = "none";
    }
  };
  // --- 버튼 활성화 ---
  const enableButtons = () => {
    if (prevbtn) {
      prevbtn.style.pointerEvents = "auto";
    }
    if (nextbtn) {
      nextbtn.style.pointerEvents = "auto";
    }
  };

  // --- 4. transitionend 로 무한 루프 처리 ---
  slideList.addEventListener("transitionend", () => {
    // 마지막 복제 슬라이드 → 첫 번째 실제 슬라이드로 순간 이동
    if (current === totalSize - 1) {
      current = 1;
      currentGoto("none");
    }
    // 마지막 복제 슬라이드 → 마지막 실제 슬라이드로 순간 이동
    if (current === 0) {
      current = totalSize - 2;
      currentGoto("none");
    }
    updateIndicator();
  });
  // --- 각각의 인티케이터 dot가 클릭이 되면 ---
  indicator.addEventListener("click", (e) => {
    // --- 클릭하면 dot가 몇번째를 클릭 ---
    const liElem = e.target;
    if (liElem.tagName === "LI") {
      const idx = Number(liElem.dataset.index);
      // --- 앞에 하나 추가 ---
      current = idx + 1;
      currentGoto("0.5s");
      // --- 원래 있던 active삭제, 현재 클릭한 dot한테 active추가 ---
      updateIndicator();
    }
  });
};
// slideInit();
slideViews.forEach((view) => {
  slideInit(view);
});

// --- 자주 묻는 질문 탭 처리 ---
// ul.top에서 클릭되면 li-menu값을 읽어서 active처리
//menu에 설정된 index번호에 맞는 ul에 active처리
const tabMenus = document.querySelectorAll('#section-5 .top li');
const tabItems = document.querySelectorAll('#section-5 .item');
tabMenus.forEach((menu,idx)=>{
  menu.addEventListener('click',()=>{
    // 1. 모든 메뉴에서 active 제거
    tabMenus.forEach((list)=>{list.classList.remove('active')});
    // 2. 클릭한 메뉴에게 active 추가
    menu.classList.add('active');
    // 3. tabitems에서도 기존의active를 제거
    tabItems.forEach((item)=>{item.classList.remove('active')});
    // 4. tabitems 이중에서 클릭한 익데스 위치에 active추가
    tabItems[idx].classList.add('active');
  });
});

// --- tabitems에 있는 각각의 li가 클릭이되면, 해당 q아래 있는 a가 보여져야 함. ---
tabItems.forEach((ulElem)=>{
const liElems = ulElem.querySelectorAll('li');
liElems.forEach((list)=>{
  list.addEventListener('click',()=>{
    list.classList.toggle('show');
  });
});
});

// --- header 영역에 scroll-popup에 show클래스가 추가/삭제 ---
const scrollElem = document.querySelector('.scroll-popup');
window.addEventListener('scroll',()=>{
  if(window.scrollY > 0){
    scrollElem.classList.add('show');
  }else{
    scrollElem.classList.remove('show');
  }
});