interface pageData {
    title: string,
    date: string,
    permalink: string,
    content: string,
    image?: string,
    preview: string,
    matchCount: number
}

/**
 * Escape HTML tags as HTML entities
 * Edited from:
 * @link https://stackoverflow.com/a/5499821
 */
const tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '…': '&hellip;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function replaceHTMLEnt(str) {
    return str.replace(/[&<>"]/g, replaceTag);
}

function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

class Search {
    private data: pageData[];
    private form: HTMLFormElement;
    private input: HTMLInputElement;
    private list: HTMLDivElement;
    private resultTitle: HTMLHeadElement;
    private resultTitleTemplate: string;

    constructor({ form, input, list, resultTitle, resultTitleTemplate }) {
        this.form = form;
        this.input = input;
        this.list = list;
        this.resultTitle = resultTitle;
        this.resultTitleTemplate = resultTitleTemplate;

        this.handleQueryString();
        this.bindQueryStringChange();
        this.bindSearchForm();
    }

    private async searchKeywords(keywords: string[]) {
        const rawData = await this.getData();
        let results: pageData[] = [];

        /// Sort keywords by their length
        keywords.sort((a, b) => {
            return b.length - a.length
        });

        for (const item of rawData) {
            let result = {
                ...item,
                preview: '',
                matchCount: 0
            }

            let matched = false;

            for (const keyword of keywords) {
                if (keyword === '') continue;

                const regex = new RegExp(escapeRegExp(replaceHTMLEnt(keyword)), 'gi');

                const contentMatch = regex.exec(result.content);
                regex.lastIndex = 0;            /// Reset regex

                const titleMatch = regex.exec(result.title);
                regex.lastIndex = 0;            /// Reset regex

                if (titleMatch) {
                    result.title = result.title.replace(regex, Search.marker);
                }

                if (titleMatch || contentMatch) {
                    matched = true;
                    ++result.matchCount;

                    let start = 0,
                        end = 100;

                    if (contentMatch) {
                        start = contentMatch.index - 20;
                        end = contentMatch.index + 80

                        if (start < 0) start = 0;
                    }

                    if (result.preview.indexOf(keyword) !== -1) {
                        result.preview = result.preview.replace(regex, Search.marker);
                    }
                    else {
                        if (start !== 0) result.preview += `[...] `;
                        result.preview += `${result.content.slice(start, end).replace(regex, Search.marker)} `;
                    }
                }
            }

            if (matched) {
                result.preview += '[...]';
                results.push(result);
            }
        }

        /** Result with more matches appears first */
        return results.sort((a, b) => {
            return b.matchCount - a.matchCount;
        });
    }

    public static marker(match) {
        return '<mark>' + match + '</mark>';
    }

    private async doSearch(keywords: string[]) {
        const startTime = performance.now();

        const results = await this.searchKeywords(keywords);
        this.clear();

        for (const item of results) {
            this.list.append(Search.render(item));
        }

        const endTime = performance.now();

        this.resultTitle.innerText = this.generateResultTitle(results.length, ((endTime - startTime) / 1000).toPrecision(1));
    }

    private generateResultTitle(resultLen, time) {
        return this.resultTitleTemplate.replace("#PAGES_COUNT", resultLen).replace("#TIME_SECONDS", time);
    }

    public async getData() {
        if (!this.data) {
            /// Not fetched yet
            const jsonURL = this.form.dataset.json;
            this.data = await fetch(jsonURL).then(res => res.json());
        }

        return this.data;
    }

    private bindSearchForm() {
        let lastSearch = '';

        const eventHandler = (e) => {
            e.preventDefault();
            const keywords = this.input.value;

            Search.updateQueryString(keywords, true);

            if (keywords === '') {
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
        this.list.innerHTML = '';
        this.resultTitle.innerText = '';
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

    public static render(item: pageData) {
        return <article>
            <a href={item.permalink}>
                <div class="article-details">
                    <h2 class="article-title" dangerouslySetInnerHTML={{ __html: item.title }}></h2>
                    <secion class="article-preview" dangerouslySetInnerHTML={{ __html: item.preview }}></secion>
                </div>
                {item.image &&
                    <div class="article-image">
                        <img src={item.image} loading="lazy" />
                    </div>
                }
            </a>
        </article>;
    }
}

declare global {
    interface Window {
        searchResultTitleTemplate: string;
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        const searchForm = document.querySelector('.search-form') as HTMLFormElement,
            searchInput = searchForm.querySelector('input') as HTMLInputElement,
            searchResultList = document.querySelector('.search-result--list') as HTMLDivElement,
            searchResultTitle = document.querySelector('.search-result--title') as HTMLHeadingElement;

        new Search({
            form: searchForm,
            input: searchInput,
            list: searchResultList,
            resultTitle: searchResultTitle,
            resultTitleTemplate: window.searchResultTitleTemplate
        });
    }, 0);
})

export default Search;