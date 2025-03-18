const addCategoryBtn = document.querySelector('.fa-plus-category');
const categoryContainer = document.querySelector('.categories');

// addCategory: 새로운 카테고리 추가
function addCategory() {
  const categoryName = prompt('새 카테고리 이름을 입력하세요:').trim();
  if (!categoryName) return;

  // 카테고리 요소 생성
  const category = document.createElement('div');
  category.className = 'category';
  category.innerHTML = `
    <div class="category-header">
      <span>${categoryName}</span>
      <i class="fa-solid fa-plus task-add-btn"></i>
    </div>
    <ul class="items"></ul>
  `;

  categoryContainer.appendChild(category);

  // 할 일 추가 버튼 이벤트 추가
  category
    .querySelector('.task-add-btn')
    .addEventListener('click', () => addTask(category.querySelector('.items')));

  // 드래그 앤 드롭 활성화
  enableDragAndDrop();
}

// addTask: 할 일 추가
function addTask(taskList) {
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.className = 'task-input';
  taskList.appendChild(taskInput);
  taskInput.focus();

  taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const text = taskInput.value.trim();
      if (!text) {
        taskInput.value = ''; // 입력값이 없을 경우 초기화
        taskInput.focus();
        return;
      }

      const taskItem = document.createElement('li');
      taskItem.className = 'item';
      taskItem.innerHTML = `
        <span>${text}</span>
        <i class="fa-solid fa-check"></i>
        <i class="fa-solid fa-trash-can"></i>
      `;

      // task 완료시 체크 버튼 이벤트
      taskItem.querySelector('.fa-check').addEventListener('click', () => {
        taskItem.classList.toggle('item_done');
      });

      // task 삭제 버튼 이벤트
      taskItem.querySelector('.fa-trash-can').addEventListener('click', () => {
        taskItem.remove();
      });

      taskList.replaceChild(taskItem, taskInput);

      // 스크롤 자동 이동 (입력된 할 일로 포커스 이동)
      setTimeout(() => taskItem.scrollIntoView({ block: 'center' }), 0);
      requestAnimationFrame(() => taskItem.scrollIntoView({ block: 'center' }));

      // 드래그 앤 드롭 활성화
      enableDragAndDrop();
    }
  });
}

// 드래그 앤 드롭 활성화 함수
function enableDragAndDrop() {
  document.querySelectorAll('.items').forEach((taskList) => {
    new Sortable(taskList, {
      animation: 150,
      group: 'shared', // 카테고리 간 이동 가능
      ghostClass: 'dragging',
      onEnd: function (evt) {
        console.log(`Moved item from ${evt.from} to ${evt.to}`);
      },
    });
  });

  new Sortable(categoryContainer, {
    animation: 150,
    group: 'categories', // 카테고리 이동 가능
    ghostClass: 'dragging',
  });
}

// 초기 실행 시 드래그 앤 드롭 활성화
enableDragAndDrop();

// 카테고리 추가 버튼 이벤트 등록
addCategoryBtn.addEventListener('click', addCategory);

// const addBtn = document.querySelector('.fa-plus'); // 추가 버튼
// const input = document.querySelector('.footer_input'); // input 요소
// const items = document.querySelector('.items'); // ul

// // querySelector: class 이름으로 검색 & 첫 번째 요소 하나만

// function createItem(text) {
//   console.log(text);
//   // li 요소 생성함수 1
//   //   const itemRow = `<li class="item item_done">
//   //           <span>오늘의 할일 리스트1</span>
//   //           <i class="fa-solid fa-check"></i>
//   //           <i class="fa-solid fa-trash-can"></i>
//   //         </li>`;
//   // li 요소 생성함수 2
//   const itemRow = document.createElement('li');
//   itemRow.className = 'item';
//   itemRow.innerHTML = `<span>${text}</span>
//           <i class="fa-solid fa-check"></i>
//           <i class="fa-solid fa-trash-can"></i>
//         </li>`;

//   // 체크 버튼 클릭 시 클래스 추가 이벤트
//   itemRow.querySelector('.fa-check').addEventListener('click', () => {
//     itemRow.classList.toggle('item_done');
//   });

//   // 삭제 버튼 클릭 시 itemRow 제거 이벤트
//   itemRow
//     .querySelector('.fa-trash-can')
//     .addEventListener('click', () => itemRow.remove());

//   //   itemRow.scrollIntoView({ block: 'center' });
//   //   // 자동으로 원하는 대상의 시점으로 focus됨

//   // 비동기처리? 1
//   setTimeout(() => itemRow.scrollIntoView({ block: 'center' }), 0);
//   // 동기적으로 진행하다가 이 함수를 만나면 잠깐 백그라운드에 함수를 던져 놓음
//   // 0초라도 잠깐 있다가 중간의 내용들이 실행됨

//   // 비동기처리? 2
//   requestAnimationFrame(() => itemRow.scrollIntoView({ block: 'center' }));

//   return itemRow;
// }
// // 요소 만들기...

// function onAdd() {
//   console.log('함수가 실행됐다');
//   const text = input.value.trim();
//   // trim(): 문자열 양쪽 끝 공백이 제거됨
//   //   console.log(text);
//   if (!text) {
//     input.value = '';
//     input.focus();
//     return;
//   }

//   // li 생성하는 함수 - createItem()
//   // ul에 생성값을 추가함

//   items.appendChild(createItem(text));
//   input.value = '';
//   input.focus();
// }

// // 이벤트 등록
// addBtn.addEventListener('click', onAdd);
// // input.addEventListener('keypress', (e) => {
// //   console.log(e);
// //   if (e.key === 'Enter') {
// //     onAdd();
// //   }
// // });

// input.addEventListener('keyup', (e) => e.key === 'Enter' && onAdd());
// // keyup: 키보드에서 손을 떼는 순간
// // 윗쪽 코드가 동일!! 앞이 참일 때 뒤를 실행해라
// // or이면 앞이 거짓일 때 뒤쪽 실행
