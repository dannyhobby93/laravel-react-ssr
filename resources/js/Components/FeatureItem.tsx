import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

import { Feature } from "@/types";
import { useState } from "react";

function FeatureItem({ feature }: { feature: Feature }) {
  const [isExpanded, setExpanded] = useState(false);

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
          <h2 className="text-2xl mb-2">{feature.name}</h2>
          <p>
            {isExpanded
              ? feature.description
              : `${feature.description.slice(0, 200)}...`}
          </p>
          <button
            onClick={toggleReadMore}
            className="text-amber-500 hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeatureItem;
