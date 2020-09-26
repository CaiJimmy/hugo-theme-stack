interface pageData {
    title: string,
    date: string,
    permalink: string,
    content: string,
    image?: string,
    preview: string,
    matchCount: number
}

const searchForm = document.querySelector('.search-form') as HTMLFormElement;
const searchInput = searchForm.querySelector('input') as HTMLInputElement;
const searchResultList = document.querySelector('.search-result--list') as HTMLDivElement;
const searchResultTitle = document.querySelector('.search-result--title') as HTMLHeadingElement;

let data: pageData[];

function createElement(tag, attrs, children) {
    var element = document.createElement(tag);

    for (let name in attrs) {
        if (name && attrs.hasOwnProperty(name)) {
            let value = attrs[name];

            if (name == "dangerouslySetInnerHTML") {
                element.innerHTML = value.__html;
            }
            else if (value === true) {
                element.setAttribute(name, name);
            } else if (value !== false && value != null) {
                element.setAttribute(name, value.toString());
            }
        }
    }
    for (let i = 2; i < arguments.length; i++) {
        let child = arguments[i];
        if (child) {
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
    }
    return element;
}

window.createElement = createElement;

function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

async function getData() {
    if (!data) {
        /// Not fetched yet
        const jsonURL = searchForm.dataset.json;
        data = await fetch(jsonURL).then(res => res.json());
    }

    return data;
}

function updateQueryString(keywords: string) {
    const pageURL = new URL(window.location.toString());

    if (keywords === '') {
        pageURL.searchParams.delete('keyword')
    }
    else {
        pageURL.searchParams.set('keyword', keywords);
    }

    window.history.pushState('', '', pageURL.toString());
}

function bindQueryStringChange() {
    window.addEventListener('popstate', (e) => {
        handleQueryString()
    })
}

function handleQueryString() {
    const pageURL = new URL(window.location.toString());
    const keywords = pageURL.searchParams.get('keyword');
    searchInput.value = keywords;

    if (keywords) {
        doSearch(keywords.split(' '));
    }
    else {
        clear()
    }
}

function bindSearchForm() {
    let lastSearch = '';
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const keywords = searchInput.value;

        updateQueryString(keywords);

        if (keywords === '') {
            return clear();
        }

        if (lastSearch === keywords) return;
        lastSearch = keywords;

        doSearch(keywords.split(' '));
    })
}

function clear() {
    searchResultList.innerHTML = '';
    searchResultTitle.innerText = '';
}

async function doSearch(keywords: string[]) {
    const startTime = performance.now();

    const results = await searchKeyword(keywords);
    clear();

    for (const item of results) {
        searchResultList.append(render(item));
    }

    const endTime = performance.now();

    searchResultTitle.innerText = `${results.length} pages (${((endTime - startTime) / 1000).toPrecision(1)} seconds)`;
}

function marker(match, p1, p2, p3, offset, string) {
    return '<mark>' + match + '</mark>';
}

async function searchKeyword(keywords: string[]) {
    const rawData = await getData();
    let results: pageData[] = [];

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
            const regex = new RegExp(escapeRegExp(keyword), 'gi');

            const contentMatch = regex.exec(item.content);
            regex.lastIndex = 0;            /// Reset regex
            const titleMatch = regex.exec(item.title);
            regex.lastIndex = 0;            /// Reset regex

            if (titleMatch) {
                result.title = item.title.replace(regex, marker);
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
                    result.preview = result.preview.replace(regex, marker);
                }
                else {
                    if (start !== 0) result.preview += `[...] `;
                    result.preview += `${result.content.slice(start, end).replace(regex, marker)} `;
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

const render = (item: pageData) => {
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

window.addEventListener('load', () => {
    handleQueryString();
    bindQueryStringChange();
    bindSearchForm();
})