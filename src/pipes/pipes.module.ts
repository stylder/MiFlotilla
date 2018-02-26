import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { SearchPipe } from './search/search';
@NgModule({
	declarations: [FilterPipe,
    SearchPipe],
	imports: [],
	exports: [FilterPipe,
    SearchPipe]
})
export class PipesModule {}
