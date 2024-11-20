import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

import { Feature } from "@/types";
import FeatureActionsDropdown from "./FeatureActionsDropdown";
import { Link } from "@inertiajs/react";
import { useState } from "react";

function FeatureItem({
  feature,
  singleItem,
}: {
  feature: Feature;
  singleItem?: Boolean;
}) {
  const [isExpanded, setExpanded] = useState(singleItem);

  const toggleReadMore = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        <div className="flex flex-col items-center">
          <button>
            <ChevronUpIcon className="size-12" />
          </button>
          <span className="text-2xl font-semibold">12</span>
          <button>
            <ChevronDownIcon className="size-12" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            {!singleItem ? (
              <Link href={route("feature.show", feature)}>{feature.name}</Link>
            ) : (
              feature.name
            )}
          </h2>
          {feature.description.length > 200 ? (
            <div>
              <p>
                {isExpanded
                  ? feature.description
                  : `${(feature.description || "").slice(0, 200)}...`}
              </p>
              {!singleItem && (
                <button
                  onClick={toggleReadMore}
                  className="text-amber-500 hover:underline"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          ) : (
            <p>{feature.description}</p>
          )}
        </div>
        <div>
          <FeatureActionsDropdown feature={feature} />
        </div>
      </div>
    </div>
  );
}

export default FeatureItem;
