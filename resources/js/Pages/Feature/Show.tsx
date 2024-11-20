import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import { Head } from "@inertiajs/react";

export default function Show({ feature }: { feature: Feature }) {
  console.log(feature);
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          View Feature
        </h2>
      }
    >
      <Head title={"Feature" + feature.name} />
      <FeatureItem feature={feature} singleItem={true} />
    </AuthenticatedLayout>
  );
}