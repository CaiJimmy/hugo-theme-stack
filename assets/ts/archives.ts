interface PageData {
    title: string;
    content: string;
    id: string;
}

class Search {
    private data: PageData[];
    private form: HTMLFormElement;
    private input: HTMLInputElement;
    private resultTitle: HTMLHeadElement;
    private resultTitleTemplate: string;

    constructor({ form, input, resultTitle, resultTitleTemplate }) {
        this.form = form;
        this.input = input;
        this.resultTitle = resultTitle;
        this.resultTitleTemplate = resultTitleTemplate;

        this.handleQueryString();
        this.bindQueryStringChange();
        this.bindSearchForm();
    }

    private async getIndex() {
        if (!this.data) {
            const jsonURL = this.form.dataset.json;
            this.data = await fetch(jsonURL).then(res => res.json());
        }
        return this.data;
    }

    private async searchKeywords(keywords: string[]) {
        const index = await this.getIndex();
        /// Return an set of ids that match the keywords
        return new Set(index.filter(item => {
            return keywords.every(keyword => {
                return item.title.includes(keyword) || item.content.includes(keyword);
            });
        }).map(item => item.id));
    }

    private async doSearch(keywords: string[]) {
        const startTime = performance.now();

        const results = await this.searchKeywords(keywords);
        this.clear();

        /// Hide all articles except the ones that are in the results
        const archiveGroups = document.querySelectorAll('.archives-group') as NodeListOf<HTMLDivElement>;

        archiveGroups.forEach(group => {
            const articles = Array.from(group.querySelectorAll('article'));
            articles.map(article => {
                article.style.display = 'none';
                article.style.removeProperty('border-bottom');
            });

            const matchingArticles = articles.filter(article => results.has(article.id));

            const hasResults = matchingArticles.length > 0;
            if (!hasResults) return group.style.display = 'none';

            matchingArticles.map(article => article.style.removeProperty('display'));
            matchingArticles[matchingArticles.length - 1].style.borderBottom = 'none';
        });

        const endTime = performance.now();
        this.resultTitle.innerText = this.generateResultTitle(results.size, ((endTime - startTime) / 1000).toPrecision(1));
        this.resultTitle.style.display = 'block';
    }

    private generateResultTitle(resultLen, time) {
        return this.resultTitleTemplate.replace("#PAGES_COUNT", resultLen).replace("#TIME_SECONDS", time);
    }

    private bindSearchForm() {
        let lastSearch = '';

        const eventHandler = (e) => {
            e.preventDefault();
            const keywords = this.input.value.trim();

            Search.updateQueryString(keywords, true);

            if (keywords === '') {
                lastSearch = '';
                return this.clear();
            }

            if (lastSearch === keywords) return;
            lastSearch = keywords;

            this.doSearch(keywords.split(' '));
        }

        this.input.addEventListener('input', eventHandler);
        this.input.addEventListener('compositionend', eventHandler);
    }

    private clear() {
        this.resultTitle.style.display = 'none';
        document.querySelectorAll('.archives-group, .archives-group article').forEach(el => el.removeAttribute('style'));
    }

    private bindQueryStringChange() {
        window.addEventListener('popstate', (e) => {
            this.handleQueryString()
        })
    }

    private handleQueryString() {
        const pageURL = new URL(window.location.toString());
        const keywords = pageURL.searchParams.get('keyword');
        this.input.value = keywords;

        if (keywords) {
            this.doSearch(keywords.split(' '));
        }
        else {
            this.clear()
        }
    }

    private static updateQueryString(keywords: string, replaceState = false) {
        const pageURL = new URL(window.location.toString());

        if (keywords === '') {
            pageURL.searchParams.delete('keyword')
        }
        else {
            pageURL.searchParams.set('keyword', keywords);
        }

        if (replaceState) {
            window.history.replaceState('', '', pageURL.toString());
        }
        else {
            window.history.pushState('', '', pageURL.toString());
        }
    }
}

declare global {
    interface Window {
        searchResultTitleTemplate: string;
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        const searchForm = document.getElementById('search-form') as HTMLFormElement,
            searchInput = searchForm.querySelector('input') as HTMLInputElement,
            searchResultTitle = document.querySelector('.search-result--title') as HTMLHeadingElement;

        new Search({
            form: searchForm,
            input: searchInput,
            resultTitle: searchResultTitle,
            resultTitleTemplate: window.searchResultTitleTemplate
        });
    }, 0);
})

export default Search;