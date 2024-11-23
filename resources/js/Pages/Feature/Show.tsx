import { Comment, Feature } from "@/types";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FeatureItem from "@/Components/FeatureItem";
import { Head } from "@inertiajs/react";

export default function Show({
  feature,
  comments,
}: {
  feature: Feature;
  comments: Comment[];
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          View Feature
        </h2>
      }
    >
      <Head title={"Feature" + feature.name} />
      <FeatureItem feature={feature} comments={comments} singleItem={true} />
    </AuthenticatedLayout>
  );
}
