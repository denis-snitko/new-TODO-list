const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aera66',
    completed: false,
    body: 'Купить молока и пожрать 1',
    title: 'В магазе 1',
  },
  {
    _id: '5d2ca9e2e03d40b323336596aa66',
    completed: false,
    body: 'Купить молока и пожрать 2',
    title: 'В магазе 2',
  },
  {
    _id: '5d2ca9e2e03d40bdc326596aa66',
    completed: false,
    body: 'Купить молока и пожрать 3',
    title: 'В магазе 3',
  },
  {
    _id: '5d2ca9e2dfc2e03d40b326596aa66',
    completed: false,
    body: 'Купить молока и пожрать 4',
    title: 'В магазе 4',
  }
]

const todoApp = (arrOfTasks) => {
  // Делаем из массива объектов, объект объектов, для удобства и упрощения доступа к задаче, где ключем является _id
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task
    return acc
  }, {})

  // Элементы UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group',
  )
  const form = document.forms['addTask']
  const inputTitle = form.elements['title']
  const inputBody = form.elements['body']

  // Рендерим
  renderAllTasks(objOfTasks)

  // События
  form.addEventListener('submit', onFormSubmitHandler)
  listContainer.addEventListener('click', onDeleteHandler)

  // Функция рендера задач в DOM с помощью фрагмента
  function renderAllTasks(taskList) {
    if (!taskList) return

    // Создаем фрагмент для парсинга HTML
    const fragment = document.createDocumentFragment()
    // Перебор объекта с задачами
    Object.values(taskList).forEach((task) => {
      const li = listItemTemplate(task)
      // Добавляем li в fragment
      fragment.appendChild(li)
      // Парсим фрагмент в DOM
      listContainer.append(fragment)
    })
  }

  // Функция шаблона для фрагмента
  function listItemTemplate({ _id, title, body } = {}) {
    // li
    const li = document.createElement('li')
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    )
    // Вешаем id на текущую задачу
    li.setAttribute('data-task-id', _id)

    // h4
    const h4 = document.createElement('h4')
    h4.textContent = title
    h4.classList.add('task-title')
    li.appendChild(h4)

    // p
    const p = document.createElement('p')
    p.classList.add('mt-2', 'w-100', 'task-text')
    p.textContent = body
    li.appendChild(p)

    // deleteBtn
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')
    deleteBtn.textContent = 'Удалить'
    li.appendChild(deleteBtn)

    return li
  }

  // Функция обрабочика формы
  function onFormSubmitHandler(event) {
    event.preventDefault()
    const titleValue = inputTitle.value
    const bodyValue = inputBody.value
    if (!titleValue) return
    const task = createNewTask(titleValue, bodyValue)
    const listItem = listItemTemplate(task)
    listContainer.insertAdjacentElement('afterbegin', listItem)
    form.reset()
  }

  // Функция создания задачи в виде объекта и добавления ее в cgbcjr pflfx
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      _id: `task-${Math.round(Math.random() * 10000000)}`,
      completed: false,
    }
    objOfTasks[newTask._id] = newTask
    return { ...newTask }
  }

  // Функция удаления задачи
  function onDeleteHandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]')
      const id = parent.dataset.taskId
      const confirmed = isConfirm(id)
      deleteTaskFromHTML(confirmed, parent)
      
    }
  }

  // Функция подтверждения удаления
  function isConfirm(id) {
    const title = objOfTasks[id].title
    const isConfirm = confirm(`Вы уверены, что хотите удалить задачу "${title}"?`)
    if (!isConfirm) return isConfirm
    deleteTask(id);
    return isConfirm
  }

  // Функция удаления из объекта
  function deleteTask(id) {
    delete objOfTasks[id]
  }

  // Функция удаления из HTML
  function deleteTaskFromHTML(confirmed, el) {
    if(!confirmed) return
    el.remove()
  }
}

// Global Run
todoApp(tasks)
