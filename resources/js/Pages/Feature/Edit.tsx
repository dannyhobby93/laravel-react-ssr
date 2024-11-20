import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FeatureItem from "@/Components/FeatureItem";
import { Head } from "@inertiajs/react";
import { PaginatedData } from "@/types";

export default function Edit({ features }: { features: PaginatedData<any> }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Feature
        </h2>
      }
    >
      <Head title="Features" />

      {features.data.map((feature) => (
        <FeatureItem feature={feature} key={feature.id} />
      ))}
    </AuthenticatedLayout>
  );
}
