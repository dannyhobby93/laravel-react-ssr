import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { Comment, Feature } from "@/types";
import { Link, useForm } from "@inertiajs/react";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import FeatureActionsDropdown from "./FeatureActionsDropdown";
import { useState } from "react";

function FeatureItem({
  feature,
  comments,
  singleItem,
}: {
  feature: Feature;
  comments?: Comment[];
  singleItem?: Boolean;
}) {
  const [isExpanded, setExpanded] = useState(singleItem);

  const toggleReadMore = () => {
    setExpanded(!isExpanded);
  };

  const upvoteForm = useForm({
    upvote: true,
  });

  const downvoteForm = useForm({
    upvote: false,
  });

  const upvoteDownvote = (upvote: boolean) => {
    if (
      (feature.user_has_upvoted && upvote) ||
      (feature.user_has_downvoted && !upvote)
    ) {
      upvoteForm.delete(route("upvote.destroy", feature.id), {
        preserveScroll: true,
      });
    } else {
      let form = null;

      if (upvote) {
        form = upvoteForm;
      } else {
        form = downvoteForm;
      }

      form.post(route("upvote.store", feature.id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        <div className="flex flex-col items-center">
          <button
            onClick={() => upvoteDownvote(true)}
            className={feature.user_has_upvoted ? "text-amber-600" : ""}
          >
            <ChevronUpIcon className="size-12" />
          </button>
          <span
            className={
              `text-2xl font-semibold ` +
              (feature.user_has_upvoted || feature.user_has_downvoted
                ? "text-amber-600"
                : "")
            }
          >
            {feature.upvote_count}
          </span>
          <button
            onClick={() => upvoteDownvote(false)}
            className={feature.user_has_downvoted ? "text-amber-600" : ""}
          >
            <ChevronDownIcon className="size-12" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            {!singleItem ? (
              <Link
                prefetch={["hover", "click"]}
                href={route("feature.show", feature)}
              >
                {feature.name}
              </Link>
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
          {singleItem && comments && (
            <div className="mt-8">
              <CommentForm feature={feature} />
              {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
            </div>
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
