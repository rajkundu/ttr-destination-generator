const GRAPH_US = {
    "Vancouver": [
        {"Seattle": 1},
        {"Calgary": 3}
    ],
    "Seattle": [
        {"Vancouver": 1},
        {"Calgary": 4},
        {"Helena": 6},
        {"Portland": 1}
    ],
    "Portland": [
        {"Seattle": 1},
        {"San Francisco": 5},
        {"Salt Lake City": 6}
    ],
    "San Francisco": [
        {"Portland": 5},
        {"Salt Lake City": 5},
        {"Los Angeles": 3}
    ],
    "Los Angeles": [
        {"San Francisco": 3},
        {"Las Vegas": 2},
        {"Phoenix": 3},
        {"El Paso": 6}
    ],
    "Calgary": [
        {"Seattle": 4},
        {"Helena": 4},
        {"Winnipeg": 6},
        {"Vancouver": 3}
    ],
    "Helena": [
        {"Calgary": 4},
        {"Seattle": 6},
        {"Salt Lake City": 3},
        {"Denver": 4},
        {"Omaha": 5},
        {"Duluth": 6},
        {"Winnipeg": 4}
    ],
    "Salt Lake City": [
        {"Helena": 3},
        {"Portland": 6},
        {"San Francisco": 5},
        {"Las Vegas": 3},
        {"Denver": 3}
    ],
    "Las Vegas": [
        {"Salt Lake City": 3},
        {"Los Angeles": 2}
    ],
    "Phoenix": [
        {"Los Angeles": 3},
        {"Santa Fe": 3},
        {"El Paso": 3},
        {"Denver": 5}
    ],
    "Santa Fe": [
        {"Phoenix": 3},
        {"El Paso": 2},
        {"Denver": 2},
        {"Oklahoma City": 3}
    ],
    "Denver": [
        {"Salt Lake City": 3},
        {"Helena": 4},
        {"Santa Fe": 2},
        {"Kansas City": 4},
        {"Omaha": 4},
        {"Phoenix": 5},
        {"Oklahoma City": 4}
    ],
    "El Paso": [
        {"Los Angeles": 6},
        {"Phoenix": 3},
        {"Santa Fe": 2},
        {"Dallas": 4},
        {"Houston": 6},
        {"Oklahoma City": 5}
    ],
    "Winnipeg": [
        {"Calgary": 6},
        {"Duluth": 4},
        {"Sault St. Marie": 6},
        {"Helena": 4}
    ],
    "Duluth": [
        {"Winnipeg": 4},
        {"Helena": 6},
        {"Omaha": 2},
        {"Chicago": 3},
        {"Toronto": 6},
        {"Sault St. Marie": 3}
    ],
    "Omaha": [
        {"Duluth": 2},
        {"Helena": 5},
        {"Denver": 4},
        {"Kansas City": 1},
        {"Chicago": 4}
    ],
    "Kansas City": [
        {"Omaha": 1},
        {"Denver": 4},
        {"Oklahoma City": 2},
        {"Saint Louis": 2}
    ],
    "Oklahoma City": [
        {"Kansas City": 2},
        {"Santa Fe": 3},
        {"El Paso": 5},
        {"Dallas": 2},
        {"Little Rock": 2},
        {"Denver": 4}
    ],
    "Dallas": [
        {"Oklahoma City": 2},
        {"El Paso": 4},
        {"Houston": 1},
        {"Little Rock": 2}
    ],
    "Houston": [
        {"Dallas": 1},
        {"El Paso": 6},
        {"New Orleans": 2}
    ],
    "Little Rock": [
        {"Oklahoma City": 2},
        {"Dallas": 2},
        {"Saint Louis": 2},
        {"Nashville": 3},
        {"New Orleans": 3}
    ],
    "New Orleans": [
        {"Houston": 2},
        {"Little Rock": 3},
        {"Atlanta": 4},
        {"Miami": 6}
    ],
    "Saint Louis": [
        {"Kansas City": 2},
        {"Little Rock": 2},
        {"Chicago": 2},
        {"Pittsburgh": 5},
        {"Nashville": 2}
    ],
    "Chicago": [
        {"Saint Louis": 2},
        {"Omaha": 4},
        {"Duluth": 3},
        {"Toronto": 4},
        {"Pittsburgh": 3}
    ],
    "Toronto": [
        {"Chicago": 4},
        {"Duluth": 6},
        {"Sault St. Marie": 2},
        {"Montreal": 3},
        {"Pittsburgh": 2}
    ],
    "Sault St. Marie": [
        {"Winnipeg": 6},
        {"Duluth": 3},
        {"Toronto": 2},
        {"Montreal": 5}
    ],
    "Montreal": [
        {"Sault St. Marie": 5},
        {"Toronto": 3},
        {"Boston": 2},
        {"New York": 3}
    ],
    "Boston": [
        {"Montreal": 2},
        {"New York": 2}
    ],
    "New York": [
        {"Montreal": 3},
        {"Boston": 2},
        {"Pittsburgh": 2},
        {"Washington": 2}
    ],
    "Pittsburgh": [
        {"Chicago": 3},
        {"Saint Louis": 5},
        {"Toronto": 2},
        {"New York": 2},
        {"Washington": 2},
        {"Raleigh": 2},
        {"Nashville": 4}
    ],
    "Nashville": [
        {"Saint Louis": 2},
        {"Little Rock": 3},
        {"Atlanta": 1},
        {"Pittsburgh": 4},
        {"Raleigh": 3}
    ],
    "Atlanta": [
        {"Nashville": 1},
        {"Raleigh": 2},
        {"New Orleans": 4},
        {"Miami": 5},
        {"Charleston": 2}
    ],
    "Raleigh": [
        {"Washington": 2},
        {"Pittsburgh": 2},
        {"Atlanta": 2},
        {"Charleston": 2},
        {"Nashville": 3}
    ],
    "Charleston": [
        {"Raleigh": 2},
        {"Atlanta": 2},
        {"Miami": 4}
    ],
    "Miami": [
        {"New Orleans": 6},
        {"Atlanta": 5},
        {"Charleston": 4}
    ],
    "Washington": [
        {"New York": 2},
        {"Pittsburgh": 2},
        {"Raleigh": 2}
    ]
};

const min_degrees_separation = 2; //TODO: make this configurable with an HTML input

function floydWarshall(graph) {
    const nodes = Object.keys(graph);

    // Step 1: Initialize distance matrix
    let dist = {};
    nodes.forEach(node => {
        dist[node] = {};
        nodes.forEach(otherNode => {
            dist[node][otherNode] = Infinity;
        });
        dist[node][node] = 0;
    });

    // Step 2: Fill the graph distances
    for (let node in graph) {
        graph[node].forEach(neighbor => {
            const [neighborNode, weight] = Object.entries(neighbor)[0];
            dist[node][neighborNode] = weight;
        });
    }

    // Step 3: Apply Floyd-Warshall
    for (let k of nodes) {
        for (let i of nodes) {
            for (let j of nodes) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Step 4: Collect results
    let cards = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const node1 = nodes[i];
            const node2 = nodes[j];
            if (dist[node1][node2] < Infinity) {
                cards.push([node1, node2, dist[node1][node2]]);
            }
        }
    }

    return cards;
}

function filterBySeparation(graph, cards, minSeparationDegrees = 1, debug = false) {
    let filteredCards = [];

    // Step 1: Create adjacency list for BFS
    const nodes = Object.keys(graph);
    let adjacency = {};
    nodes.forEach(node => {
        adjacency[node] = new Set(graph[node].map(neighbor => Object.keys(neighbor)[0]));
    });

    // Step 2: BFS to calculate "hops"
    function bfs(start) {
        let hops = {};
        nodes.forEach(node => hops[node] = Infinity);
        hops[start] = 0;
        let queue = [start];

        while (queue.length > 0) {
            const node = queue.shift();
            adjacency[node].forEach(neighbor => {
                if (hops[neighbor] === Infinity) {
                    hops[neighbor] = hops[node] + 1;
                    queue.push(neighbor);
                }
            });
        }
        return hops;
    }

    // Step 3: Filter based on degrees of separation
    cards.forEach(card => {
        const [node1, node2, points] = card;
        const hops = bfs(node1);
        if (hops[node2] >= minSeparationDegrees) {
            filteredCards.push(card);
        } else if (debug) {
            console.log("Discarding ", card);
        }
    });

    return filteredCards;
}

let cards = floydWarshall(GRAPH_US);
cards = filterBySeparation(GRAPH_US, cards, min_degrees_separation);

// Randomly shuffle cards
cards.sort(() => Math.random() - 0.5);

console.log(cards);

const itemsPerPage = 3;
const numPages = Math.ceil(cards.length / itemsPerPage);

// State variables
let currentPageNum = 0;
let cardInfoVisible = false;

const cardInfoContainer = document.querySelector("#cardInfo");
function renderCardInfo(cards) {
    cardInfoContainer.innerHTML = "";
    cards.forEach(card => {
        const [from, to, points] = card;
        const p = document.createElement('p');
        p.innerHTML = `<b>${from}</b> to <b>${to}</b> (<b>${points}</b> points)`;
        cardInfoContainer.appendChild(p);
    });
}

function pageButtonCB(event) {
    if (event != null && event.target == prevPageButton && currentPageNum > 0) {
        currentPageNum--;
    } else if (event != null && event.target == nextPageButton && currentPageNum < numPages-1) {
        currentPageNum++;
    }
    prevPageButton.disabled = !(currentPageNum > 0);
    nextPageButton.disabled = !(currentPageNum < numPages-1);
    const start = currentPageNum*itemsPerPage;
    const end = Math.min(start + itemsPerPage, cards.length);
    renderCardInfo(cards.slice(start, end));
    document.querySelector("#pageNumbers").innerText = `${currentPageNum+1}/${numPages}`;
}

// Get the container where buttons will be added
const buttonContainer = document.getElementById('buttonContainer');
prevPageButton = document.querySelector("#prevPageButton");
nextPageButton = document.querySelector("#nextPageButton");
prevPageButton.addEventListener('click', pageButtonCB);
nextPageButton.addEventListener('click', pageButtonCB);

showHideButton = document.querySelector("#showHideButton");
showHideButton.addEventListener('click', showHideButtonCB);

function showHideButtonCB(event) {
    if (event != null && event.target == showHideButton) {
        cardInfoVisible = !cardInfoVisible;
    }
    showHideButton.innerText = cardInfoVisible ? "Hide" : "Show";
    cardInfoContainer.style.visibility = cardInfoVisible ? "visible" : "hidden";
}

pageButtonCB(null);
showHideButtonCB(null);
