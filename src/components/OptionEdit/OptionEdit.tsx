import React, { useState } from "react"
import Button from "../Button/Button"
import { Response } from "../../types"
import styles from "./optionedit.module.scss"
import { Link, useNavigate } from "react-router-dom"
import DropDown from "../Dropdown/Dropdown"
import Option from "../../types"
import axios from "axios"
import { toast } from "react-toastify"
interface Status {
  id: number
  name: string
  available: boolean
}
const LIST = [
  {
    id: 0,
    name: "В наличии",
    available: true,
  },
  {
    id: 1,
    name: "Нет в наличии",
    available: false,
  },
]

const OptionEdit = () => {
  const [status, setStatus] = useState(LIST[0])
  const [drag, setDrag] = useState(false)
  const [imageFile, setFile] = useState<File>()
  const navigate = useNavigate()
  const [optionAdd, setOptionAdd] = useState<number>()

  const postOption = async (formData: FormData) => {
    try {
      const response: Response = await axios(
        `http://127.0.0.1:8000/options/post/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          data: formData as FormData,
        }
      )
      setOptionAdd(response.data.id)
      //   console.log(response.data.id)
      toast.success("Опция успешно добавлена, теперь добавьте изображение", {
        icon: "🚀",
      })

      //   navigate("/planesDevelopment_frontend/options-list")
    } catch {
      toast.error("Проверьте введенные данных", {
        icon: "😕",
      })
    }
  }
  const postOptionImage = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response: Response = await axios(
        `http://127.0.0.1:8000/options/${optionAdd}/image/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData as FormData,
        }
      )
      console.log(response)
      toast.success("Изображение успешно добавлена", {
        icon: "🚀",
      })
      navigate("/planesDevelopment_frontend/options-list")
    } catch {
      toast.error("Проверьте введенные данных", {
        icon: "😕",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: FormData = new FormData(e.target as HTMLFormElement)
    formData.append("available", status.available.toString())
    await postOption(formData)

    if (optionAdd) {
      await postOptionImage(imageFile)
    }
  }

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setFile(file)
    console.log(file)
    console.log(imageFile)
  }

  const handleStatusChange = (selectedOption: Status) => {
    setStatus(selectedOption)
    // console.log(status)
  }

  return (
    <div className={styles["edit-form"]}>
      <form className={styles["edit-form__block"]} onSubmit={handleSubmit}>
        <div className={styles["edit-form__block_text"]}>
          <h1>Внесние новой опции</h1>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>
              Укажите название новой опции:
            </div>
            <input
              name="title"
              type="text"
              className={styles["edit-form__block_input"]}
              placeholder="Название опции..."
            ></input>
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>
              Укажите описание новой опции:
            </div>
            <input
              name="description"
              type="text"
              className={styles["edit-form__block_input"]}
              placeholder="Введите описание..."
            ></input>
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>
              Укажите стоимость новой опции:
            </div>
            <input
              name="price"
              type="text"
              className={styles["edit-form__block_input"]}
              placeholder="Введите стоимость..."
            ></input>
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>
              Укажите наличие новой опции:
            </div>
            <DropDown
              handleSelect={handleStatusChange}
              options={LIST}
              title={status.name}
            ></DropDown>
          </div>
          <Button>Добавить</Button>
        </div>
      </form>
      <form className={styles.droparea}>
        {/* <div > */}
        {drag ? (
          <div
            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
              dragStartHandler(e)
            }
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) =>
              dragLeaveHandler(e)
            }
            onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
              dragStartHandler(e)
            }
            onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
            style={{ width: `100%`, height: `100%` }}
          >
            Отпустите файлы
          </div>
        ) : (
          <div
            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
              dragStartHandler(e)
            }
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) =>
              dragLeaveHandler(e)
            }
            onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
              dragStartHandler(e)
            }
            style={{ width: `100%`, height: `100%`, margin: `auto` }}
          >
            Перетащите файлы
          </div>
        )}
        <Button>Добавить Изображение</Button>
        {/* </div> */}
      </form>
      {/* </form> */}
    </div>
  )
}

export default OptionEdit
