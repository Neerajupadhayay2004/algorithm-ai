-- Seed data for AlgoSolver AI platform

-- Insert algorithm categories
INSERT INTO algorithm_categories (name, description, icon, color) VALUES
('Sorting', 'Algorithms for arranging data in order', '📊', 'from-blue-500 to-cyan-500'),
('Searching', 'Algorithms for finding specific elements', '🔍', 'from-purple-500 to-pink-500'),
('Graph', 'Algorithms for graph data structures', '🕸️', 'from-green-500 to-emerald-500'),
('Dynamic Programming', 'Optimization algorithms using memoization', '🧠', 'from-orange-500 to-red-500'),
('Tree', 'Algorithms for tree data structures', '🌳', 'from-teal-500 to-blue-500'),
('String', 'Algorithms for string manipulation', '📝', 'from-indigo-500 to-purple-500');

-- Insert sample algorithms
INSERT INTO algorithms (name, category_id, difficulty, time_complexity, space_complexity, description, explanation) VALUES
('Quick Sort', 1, 'Medium', 'O(n log n)', 'O(log n)', 'Efficient divide-and-conquer sorting algorithm', 'Quick Sort works by selecting a pivot element and partitioning the array around it.'),
('Binary Search', 2, 'Easy', 'O(log n)', 'O(1)', 'Search algorithm for sorted arrays', 'Binary Search repeatedly divides the search interval in half.'),
('Dijkstra Algorithm', 3, 'Hard', 'O(V²)', 'O(V)', 'Shortest path algorithm for weighted graphs', 'Dijkstra finds the shortest path from a source vertex to all other vertices.'),
('Merge Sort', 1, 'Medium', 'O(n log n)', 'O(n)', 'Stable divide-and-conquer sorting algorithm', 'Merge Sort divides the array into halves and merges them in sorted order.'),
('Fibonacci DP', 4, 'Easy', 'O(n)', 'O(1)', 'Optimized Fibonacci sequence calculation', 'Dynamic Programming approach to calculate Fibonacci numbers efficiently.'),
('Breadth-First Search', 3, 'Medium', 'O(V + E)', 'O(V)', 'Graph traversal algorithm using queue', 'BFS explores all vertices at the current depth before moving to the next depth level.');

-- Insert algorithm implementations
INSERT INTO algorithm_implementations (algorithm_id, language, code, explanation) VALUES
(1, 'JavaScript', 
'function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}', 
'JavaScript implementation of Quick Sort with in-place partitioning'),

(2, 'Python', 
'def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1', 
'Python implementation of Binary Search with iterative approach');

-- Insert algorithm tags
INSERT INTO algorithm_tags (algorithm_id, tag) VALUES
(1, 'divide-conquer'), (1, 'in-place'), (1, 'unstable'),
(2, 'divide-conquer'), (2, 'iterative'), (2, 'recursive'),
(3, 'shortest-path'), (3, 'greedy'), (3, 'weighted-graph'),
(4, 'divide-conquer'), (4, 'stable'), (4, 'external-sorting'),
(5, 'memoization'), (5, 'bottom-up'), (5, 'optimization'),
(6, 'graph-traversal'), (6, 'queue'), (6, 'level-order');

-- Initialize algorithm stats
INSERT INTO algorithm_stats (algorithm_id, views, implementations_count, average_rating) VALUES
(1, 15420, 8, 4.8),
(2, 23150, 12, 4.9),
(3, 18900, 6, 4.7),
(4, 12800, 10, 4.6),
(5, 9600, 15, 4.5),
(6, 16750, 9, 4.8);
