// RankingsPage.jsx
import React, { useState } from 'react';
import { RankingList } from "../components/rankings/RankingList";
import { SelectOption } from "../components/rankings/SelectOption";

export function RankingsPage() {
    const [selectedCategoryId, setSelectedCategoryId] = useState("0");
    const [rankingType, setRankingType] = useState("0");

    return <div  className="pt-28 px-4 lg:px-40">
        <SelectOption onCategoryChange={setSelectedCategoryId} onRankingTypeChange={setRankingType} />
        <RankingList categoryId={selectedCategoryId} rankingType={rankingType}/>
    </div>;
}
