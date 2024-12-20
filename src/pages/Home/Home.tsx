import "./styles.scss";
import React from "react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

import Select from "react-select";
import "react-calendar/dist/Calendar.css";

interface Inputs {
  name: string;
  secondName: string;
  thirdName?: string;
  gender?: { value: string; label: string };
  dateOfBirth: Date;
  phone: string;
  email: string;
  addres?: string;
  workName?: string;
}
const options = [
  { value: "Мужской", label: "Мужской" },
  { value: "Женский", label: "Женский" },
];

const Home = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      gender: options[0],
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("vse OK", data);
    alert("Форма валидна, отправляется запрос");
  };

  const phoneValidation = (value) => {
    return !value.includes("_") || "Номер введен неверно";
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Информация о сотруднике</h1>
        <div className="field-container">
          <input
            type="text"
            className={errors.secondName ? "input-error" : "input"}
            {...register("secondName", { required: "Поле является обязательным" })}
          />
          <label className={watch("secondName", "") ? "input__placeholder" : "input__placeholder-empty"}>Фамилия</label>
          <span className={errors.secondName ? "fieldError" : "fieldErrorHidden"}>
            {errors.secondName && errors.secondName.message}
          </span>
        </div>
        <div className="field-container">
          <input
            type="text"
            className={errors.name ? "input-error" : "input"}
            {...register("name", { required: "Поле является обязательным" })}
          />
          <label className={watch("name", "") ? "input__placeholder" : "input__placeholder-empty"}>Имя</label>
          <span className={errors.name ? "fieldError" : "fieldErrorHidden"}>{errors.name && errors.name.message}</span>
        </div>
        <div className="field-container">
          <input type="text" className="input" {...register("thirdName")} />
          <label className={watch("thirdName", "") ? "input__placeholder" : "input__placeholder-empty"}>Отчество</label>
        </div>

        <div className="small-fields-container">
          <div className="small-field-container">
            <Controller
              control={control}
              defaultValue={options[0]}
              name="gender"
              render={({ field }) => (
                <Select
                  {...field}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "rgb(88, 214, 126)",
                      primary: "rgba(68, 183, 102)",
                    },
                  })}
                  isSearchable={false}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                />
              )}
            />

            <label className="input__placeholder">Пол</label>
          </div>
          <div className="small-field-container">
            <input
              type="Date"
              className={errors.phone ? "input-error" : "input"}
              {...register("dateOfBirth", { required: "Поле является обязательным" })}
            />
            <label className={"input__placeholder"}>Дата рождения</label>
            <span className={errors.dateOfBirth ? "fieldError" : "fieldErrorHidden"}>
              {errors.dateOfBirth && errors.dateOfBirth.message}
            </span>
          </div>
          <div className="small-field-container">
            <InputMask
              className={errors.phone ? "input-error" : "input"}
              mask="+7(999)999-99-99"
              {...register("phone", { required: "Поле является обязательным", validate: phoneValidation })}
            />
            <label className={watch("phone", "") ? "input__placeholder" : "input__placeholder-empty"}>
              Мобильный телефон
            </label>
            <span className={errors.phone ? "fieldError" : "fieldErrorHidden"}>
              {errors.phone && errors.phone.message}
            </span>
          </div>
          <div className="small-field-container">
            <input
              type="text"
              className={errors.email ? "input-error" : "input"}
              {...register("email", {
                required: "Поле является обязательным",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Введеная почта не соответсвует формату",
                },
              })}
            />
            <label className={watch("email", "") ? "input__placeholder" : "input__placeholder-empty"}>Email</label>
            <span className={errors.email ? "fieldError" : "fieldErrorHidden"}>
              {errors.email && errors.email.message}
            </span>
          </div>
        </div>
        <div className="field-container">
          <input type="text" className="input" {...register("addres")} />
          <label className={watch("addres", "") ? "input__placeholder" : "input__placeholder-empty"}>
            Адрес постоянной регистрации
          </label>
        </div>
        <div className="field-container">
          <input type="text" className="input" {...register("workName")} />
          <label className={watch("workName", "") ? "input__placeholder" : "input__placeholder-empty"}>
            Название работодателя
          </label>
        </div>
        <div className="submit-container">
          <input type="submit" className="save-button" value="Сохранить" />
        </div>
      </form>
    </div>
  );
};

export default Home;
