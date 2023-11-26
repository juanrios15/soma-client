import { CategoriesList } from "../components/home/CategoriesList";
import { SearchAssessmentsBar } from "../components/home/SearchAssessmentsBar";
import { Top3 } from "../components/home/Top3";


export function HomePage() {
    return <div>
        <SearchAssessmentsBar />
        <Top3 />
        <CategoriesList />
    </div>
}