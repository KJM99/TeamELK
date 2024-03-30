import { Controller } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('elasticsearch')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
    ) {}
}
