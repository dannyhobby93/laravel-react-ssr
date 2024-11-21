import { Feature, PaginatedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FeatureItem from "@/Components/FeatureItem";
import PrimaryButton from "@/Components/PrimaryButton";
import { can } from "@/helpers";

export default function Index({
  features,
}: {
  features: PaginatedData<Feature>;
}) {
  const user = usePage().props.auth.user;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Features
        </h2>
      }
    >
      <Head title="Features" />

      {can(user, "manage_features") && (
        <Link href={route("feature.create")}>
          <PrimaryButton className="mb-8">Create new Feature</PrimaryButton>
        </Link>
      )}

      {features.data.map((feature) => (
        <FeatureItem feature={feature} key={feature.id} />
      ))}
    </AuthenticatedLayout>
  );
}
