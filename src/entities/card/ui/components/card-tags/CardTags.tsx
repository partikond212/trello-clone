import type { Card } from "@/entities/card/model/card";
import { chooseTagButtons } from "@/shared/constants/tags";
import { useState, type FC } from "react";
import CardTag from "../card-tag/CardTag";
type CardTagsProps = {
  card: Card;
};
const CardTags: FC<CardTagsProps> = ({ card }) => {
  const [cardTags] = useState(card.tags);
  return (
    <div>
      {cardTags?.map((tag) => {
        const tagInfo = chooseTagButtons.find((t) => t.tagName === tag);
        if (!tagInfo) return;
        return <CardTag CardTag={tagInfo} key={tag} />;
      })}
    </div>
  );
};

export default CardTags;
