/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
import {cloneElement} from "react";

export function appendToBody(tag, content, count) {

  for(let i = 0; i < count; i++) {
    const element = document.createElement(tag)
    element.innerHTML = content
    document.body.append(element)
  }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  let element = document.createElement('div')
  element.classList.add('item_1')

  for(let i = 2; i <= level; i++) {
    for(let j = 0; j < childrenCount; j++) {//итерация по узлам родителям

      if(i == 2) {
        let child = document.createElement('div')
        child.classList.add(`item_${i}`)
        element.append(child)
      } else {
        for (let l = 0; l < childrenCount; l++) {//итерация по узлам детям
          let child = document.createElement('div')
          child.classList.add(`item_${i}`)
          element.getElementsByClassName(`item_${i-1}`)[j].append(child)
        }
      }
    }
  }

  return element
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  let col = generateTree(2,3)
  let sec1 = document.createElement('section')
  let sec2 = document.createElement('section')

  for(let i = 0; i < 2; i++) {
    sec1.append(col.getElementsByClassName('item_3')[i].cloneNode())
    sec2.append(col.getElementsByClassName('item_3')[i + 2].cloneNode())
  }
  col.getElementsByClassName('item_2')[0].remove()
  col.getElementsByClassName('item_2')[0].remove()

  sec1.classList.add('item_2')
  sec2.classList.add('item_2')

  col.append(sec1, sec2)
  return col
}
