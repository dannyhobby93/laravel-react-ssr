import { Head, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Radio from "@/Components/Radio";
import TextInput from "@/Components/TextInput";
import { User } from "@/types";

export default function Edit({
  roles,
  roleLabels,
  user,
}: {
  roles: any;
  roleLabels: Record<string, string>;
  user: User;
}) {
  const { data, setData, processing, errors, put } = useForm({
    name: user.name ?? "",
    email: user.email ?? "",
    roles: user.roles,
  });

  const updateFeature: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("user.update", user.id));
  };

  const onRoleChange = (e: any) => {
    if (e.target.checked) {
      setData("roles", [e.target.value]);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User
        </h2>
      }
    >
      <Head title="Edit User" />

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
                disabled
                required
              />
              <InputError className="mt-2" message={errors.name} />
            </div>
            <div>
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                autoComplete="email"
                disabled
                required
              />
              <InputError className="mt-2" message={errors.email} />
            </div>

            <div>
              <InputLabel htmlFor="roles" value="Role" />
              {roles.map((role: any) => (
                <div key={role.id}>
                  <label className="flex items-center mb-1">
                    <Radio
                      name="roles"
                      value={role.name}
                      checked={data.roles.includes(role.name)}
                      onChange={onRoleChange}
                    />
                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                      {roleLabels[role.name]}
                    </span>
                  </label>
                  <InputError className="mt-2" message={errors.roles} />
                </div>
              ))}
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
