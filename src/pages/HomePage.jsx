import { CategoriesList } from "../components/CategoriesList";
import { SearchAssessmentsBar } from "../components/SearchAssessmentsBar";

export function HomePage() {
    return <div>
        <SearchAssessmentsBar/>
        <CategoriesList/>
    </div>
}