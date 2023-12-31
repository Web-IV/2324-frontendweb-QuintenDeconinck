import { useCallback } from "react";
import { Category } from "../types";
import LabelInput from "./LabelInput";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import Error from "./Error";
interface CategoriesListAdminProps {
  categories: Category[];
  onAdd: (name: string) => void;
  onDelete: (id: number) => void;
}

const validationRules = {
  name: {
    required: "Category name is required",
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Category name must only contain letters",
    },
    min: {
      length: 3,
      message: "Category name must be at least 3 characters long",
    },
  },
};

export const CategoriesListAdmin: React.FC<CategoriesListAdminProps> = ({
  categories,
  onAdd,
  onDelete,
}) => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleAdd = useCallback(
    async (data: FieldValues) => {
      onAdd(data.name);
    },
    [onAdd],
  );

  const handleDelete = async (id: number) => {
    await onDelete(id);
  };

  return (
    <div className="mb-4 flex flex-col rounded px-8 pb-8 pt-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Categories</h2>
      <ul className="mb-4" data-cy="categories">
        {categories.map((category, index) => (
          <li
            key={category.id}
            className="mb-2 flex items-center justify-between"
          >
            <span className="">{category.name}</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2
                  className="cursor-pointer"
                  data-cy={`remove-${index}`}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this product and remove the data from your server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    data-cy="delete"
                    onClick={() => handleDelete(category.id)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        ))}
      </ul>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAdd)} className="mb-4">
          {/*//@ts-ignore*/}
          <Error errors={errors} />
          <LabelInput
            label="Category name"
            name="name"
            type="name"
            validationRules={validationRules.name}
            data-cy="category-name"
          />
          <Button
            type="submit"
            variant={"destructive"}
            className="rounded px-4 py-2 font-bold "
            data-cy="add-category"
          >
            Add Category
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
