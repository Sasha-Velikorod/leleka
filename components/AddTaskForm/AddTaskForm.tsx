import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../lib/api";
import { NewTask } from "../../lib/api";
import css from "./AddTaskForm.module.css";
import { useState } from "react";

interface AddTaskFormProps {
  onCloseModal: () => void;
}

interface FormValues {
  name: string;
  categories: string[];
  description: string;
  date: string;
}

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Заголовок повинен містити мінімум 3 символи")
    .max(50, "Заголовок не може містити більше 50 символів")
    .required("Заголовок є обов'язковим"),
  description: Yup.string().max(
    500,
    "Опис не може містити більше 500 символів"
  ),
  categories: Yup.array()
    .min(1, "Оберіть хоча б одну категорію")
    .required("Категорія є обов'язковою"),
});

const categories = [
  "Натхнення",
  "Вдячність",
  "Тривога",
  "Дивні бажання",
  "Нудота",
];

const initialValues: FormValues = {
  name: "",
  categories: [],
  description: "",
  date: "",
};

const AddTaskForm = ({ onCloseModal }: AddTaskFormProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onCloseModal();
    },
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const taskData = {
      ...values,
      category: values.categories.join(", "),
    };
    mutation.mutate(taskData as NewTask);
    actions.resetForm();
  };

  return (
    <>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor="name">
                Заголовок
              </label>
              <Field className={css.input} id="name" type="text" name="name" />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label>Категорії</label>

              <div
                className={css.dropdown}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {values.categories.length === 0 ? (
                  <span className={css.placeholder}>Оберіть категорії</span>
                ) : (
                  values.categories.map((cat) => (
                    <span key={cat} className={css.tag}>
                      {cat}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newCategories = values.categories.filter(
                            (c) => c !== cat
                          );
                          setFieldValue("categories", newCategories);
                        }}
                        className={css.removeTag}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
                <span className={css.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
              </div>

              {isDropdownOpen && (
                <div className={css.dropdownMenu}>
                  {categories.map((category) => (
                    <label key={category} className={css.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={values.categories.includes(category)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...values.categories, category]
                            : values.categories.filter((c) => c !== category);
                          setFieldValue("categories", newCategories);
                        }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              )}

              <ErrorMessage
                name="categories"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="description">Запис</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={mutation.isPending}
              >
                Create note
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddTaskForm;
