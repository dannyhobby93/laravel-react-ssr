import { Head, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature } from "@/types";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

export default function Edit({ feature }: { feature: Feature }) {
  const { data, setData, processing, errors, put } = useForm({
    name: feature.name ?? "",
    description: feature.description ?? "",
  });

  const updateFeature: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("feature.update", feature.id));
  };
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Feature
        </h2>
      }
    >
      <Head title="Edit Feature" />

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
          <form onSubmit={updateFeature} className="w-full space-y-8">
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                autoComplete="name"
                required
              />

              <InputError className="mt-2" message={errors.name} />
            </div>
            <div>
              <InputLabel htmlFor="description" value="Description" />

              <TextArea
                id="description"
                className="mt-1 block w-full"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                required
              />

              <InputError className="mt-2" message={errors.description} />
            </div>
            <div>
              <PrimaryButton disabled={processing}>Update</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
