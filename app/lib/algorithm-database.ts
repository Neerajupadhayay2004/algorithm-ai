export interface Algorithm {
  id: number
  name: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeComplexity: string
  spaceComplexity: string
  description: string
  detailedDescription: string
  languages: string[]
  rating: number
  views: number
  implementations: number
  tags: string[]
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
  constraints: string[]
  hints: string[]
  code: {
    [key: string]: string
  }
  testCases: Array<{
    input: string
    expected: string
    hidden?: boolean
  }>
  relatedAlgorithms: number[]
  applications: string[]
  author: string
  dateAdded: string
  lastUpdated: string
}

export const algorithmDatabase: Algorithm[] = [
  // SORTING ALGORITHMS
  {
    id: 1,
    name: "Bubble Sort",
    category: "Sorting",
    difficulty: "Easy",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Simple comparison-based sorting algorithm that repeatedly steps through the list",
    detailedDescription:
      "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements 'bubble' to the top of the list.",
    languages: ["JavaScript", "Python", "Java", "C++"],
    rating: 4.2,
    views: 45230,
    implementations: 15,
    tags: ["comparison", "stable", "in-place", "adaptive"],
    examples: [
      {
        input: "[64, 34, 25, 12, 22, 11, 90]",
        output: "[11, 12, 22, 25, 34, 64, 90]",
        explanation: "Each pass moves the largest unsorted element to its correct position",
      },
    ],
    constraints: ["1 ≤ array length ≤ 1000", "Elements can be any comparable type"],
    hints: [
      "Compare adjacent elements and swap if needed",
      "After each pass, the largest element is in its correct position",
      "Optimize by stopping early if no swaps occur in a pass",
    ],
    code: {
      javascript: `// Bubble Sort Implementation
// Time Complexity: O(n²) - worst and average case, O(n) - best case
// Space Complexity: O(1)

function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    
    // Traverse through all array elements
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no two elements were swapped, array is sorted
        if (!swapped) break;
    }
    
    return arr;
}

// Optimized version with early termination
function bubbleSortOptimized(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no swapping happened, array is already sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);
console.log("Sorted array:", bubbleSort([...numbers]));`,
      python: `# Bubble Sort Implementation
# Time Complexity: O(n²) - worst and average case, O(n) - best case
# Space Complexity: O(1)

def bubble_sort(arr):
    """
    Sorts an array using bubble sort algorithm.
    
    Args:
        arr: List of comparable elements
        
    Returns:
        Sorted list
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n - 1):
        swapped = False
        
        # Last i elements are already in place
        for j in range(n - i - 1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no two elements were swapped, array is sorted
        if not swapped:
            break
    
    return arr

def bubble_sort_with_steps(arr):
    """
    Bubble sort with step-by-step visualization.
    """
    n = len(arr)
    steps = []
    
    for i in range(n - 1):
        step_swaps = []
        swapped = False
        
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                step_swaps.append((j, j + 1))
                swapped = True
        
        steps.append({
            'pass': i + 1,
            'array': arr.copy(),
            'swaps': step_swaps,
            'sorted_elements': i + 1
        })
        
        if not swapped:
            break
    
    return arr, steps

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", numbers)
    
    sorted_array, steps = bubble_sort_with_steps(numbers.copy())
    print("Sorted array:", sorted_array)
    
    print("\\nStep-by-step process:")
    for step in steps:
        print(f"Pass {step['pass']}: {step['array']} (Swaps: {step['swaps']})")`,
      java: `// Bubble Sort Implementation
// Time Complexity: O(n²) - worst and average case, O(n) - best case
// Space Complexity: O(1)

import java.util.Arrays;

public class BubbleSort {
    
    /**
     * Sorts an array using bubble sort algorithm.
     * 
     * @param arr Array to be sorted
     * @return Sorted array
     */
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                // Traverse the array from 0 to n-i-1
                // Swap if the element found is greater than the next element
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no two elements were swapped, array is sorted
            if (!swapped) {
                break;
            }
        }
        
        return arr;
    }
    
    /**
     * Generic bubble sort for any Comparable type.
     */
    public static <T extends Comparable<T>> void bubbleSort(T[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j].compareTo(arr[j + 1]) > 0) {
                    // Swap arr[j] and arr[j+1]
                    T temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) {
                break;
            }
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        bubbleSort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(numbers));
        
        // Test with strings
        String[] words = {"banana", "apple", "cherry", "date"};
        System.out.println("Original strings: " + Arrays.toString(words));
        bubbleSort(words);
        System.out.println("Sorted strings: " + Arrays.toString(words));
    }
}`,
      cpp: `// Bubble Sort Implementation
// Time Complexity: O(n²) - worst and average case, O(n) - best case
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>

class BubbleSort {
public:
    /**
     * Sorts a vector using bubble sort algorithm.
     * 
     * @param arr Vector to be sorted
     */
    static void bubbleSort(std::vector<int>& arr) {
        int n = arr.size();
        bool swapped;
        
        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                // Traverse the array from 0 to n-i-1
                // Swap if the element found is greater than the next element
                if (arr[j] > arr[j + 1]) {
                    std::swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }
            
            // If no two elements were swapped, array is sorted
            if (!swapped) {
                break;
            }
        }
    }
    
    /**
     * Template version for any comparable type.
     */
    template<typename T>
    static void bubbleSort(std::vector<T>& arr) {
        int n = arr.size();
        bool swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    std::swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }
            
            if (!swapped) {
                break;
            }
        }
    }
    
    /**
     * Bubble sort with custom comparator.
     */
    template<typename T, typename Compare>
    static void bubbleSort(std::vector<T>& arr, Compare comp) {
        int n = arr.size();
        bool swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (comp(arr[j + 1], arr[j])) {
                    std::swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }
            
            if (!swapped) {
                break;
            }
        }
    }
};

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    BubbleSort::bubbleSort(numbers);
    
    std::cout << "Sorted array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Sort in descending order
    std::vector<int> desc_numbers = {64, 34, 25, 12, 22, 11, 90};
    BubbleSort::bubbleSort(desc_numbers, std::greater<int>());
    
    std::cout << "Descending order: ";
    for (int num : desc_numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
    },
    testCases: [
      { input: "[64, 34, 25, 12, 22, 11, 90]", expected: "[11, 12, 22, 25, 34, 64, 90]" },
      { input: "[5, 2, 8, 1, 9]", expected: "[1, 2, 5, 8, 9]" },
      { input: "[1]", expected: "[1]" },
      { input: "[]", expected: "[]" },
      { input: "[3, 3, 3]", expected: "[3, 3, 3]", hidden: true },
    ],
    relatedAlgorithms: [2, 3, 4],
    applications: ["Educational purposes", "Small datasets", "Nearly sorted data"],
    author: "Algorithm Team",
    dateAdded: "2024-01-15",
    lastUpdated: "2024-01-20",
  },
  {
    id: 2,
    name: "Quick Sort",
    category: "Sorting",
    difficulty: "Medium",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    description: "Efficient divide-and-conquer sorting algorithm with average O(n log n) performance",
    detailedDescription:
      "Quick Sort is a highly efficient divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
    languages: ["JavaScript", "Python", "Java", "C++"],
    rating: 4.8,
    views: 78450,
    implementations: 25,
    tags: ["divide-conquer", "in-place", "unstable", "recursive"],
    examples: [
      {
        input: "[64, 34, 25, 12, 22, 11, 90]",
        output: "[11, 12, 22, 25, 34, 64, 90]",
        explanation: "Pivot partitioning recursively sorts the array",
      },
    ],
    constraints: ["1 ≤ array length ≤ 10^6", "Elements must be comparable"],
    hints: [
      "Choose a good pivot strategy to avoid worst-case performance",
      "Partition the array around the pivot",
      "Recursively sort the sub-arrays",
    ],
    code: {
      javascript: `// Quick Sort Implementation
// Time Complexity: O(n log n) average, O(n²) worst case
// Space Complexity: O(log n)

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Randomized Quick Sort for better average performance
function quickSortRandomized(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Randomize pivot to avoid worst case
        const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
        
        const pivotIndex = partition(arr, low, high);
        quickSortRandomized(arr, low, pivotIndex - 1);
        quickSortRandomized(arr, pivotIndex + 1, high);
    }
    return arr;
}

// Three-way partitioning for arrays with many duplicates
function quickSort3Way(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return arr;
    
    const [lt, gt] = partition3Way(arr, low, high);
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
    
    return arr;
}

function partition3Way(arr, low, high) {
    const pivot = arr[low];
    let i = low + 1;
    let lt = low;
    let gt = high;
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }
    
    return [lt, gt];
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);
console.log("Sorted array:", quickSort([...numbers]));`,
      python: `# Quick Sort Implementation
# Time Complexity: O(n log n) average, O(n²) worst case
# Space Complexity: O(log n)

import random

def quick_sort(arr, low=0, high=None):
    """
    Sorts an array using the Quick Sort algorithm.
    
    Args:
        arr: List to be sorted
        low: Starting index
        high: Ending index
    
    Returns:
        Sorted array
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """
    Partitions the array around a pivot element.
    
    Args:
        arr: Array to partition
        low: Starting index
        high: Ending index
    
    Returns:
        Index of the pivot after partitioning
    """
    # Choose the rightmost element as pivot
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]  # Swap elements
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort_randomized(arr, low=0, high=None):
    """
    Randomized Quick Sort for better average performance.
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Randomize pivot to avoid worst case
        random_index = random.randint(low, high)
        arr[random_index], arr[high] = arr[high], arr[random_index]
        
        pivot_index = partition(arr, low, high)
        quick_sort_randomized(arr, low, pivot_index - 1)
        quick_sort_randomized(arr, pivot_index + 1, high)
    
    return arr

def quick_sort_3way(arr, low=0, high=None):
    """
    Three-way partitioning Quick Sort for arrays with many duplicates.
    """
    if high is None:
        high = len(arr) - 1
    
    if low >= high:
        return arr
    
    lt, gt = partition_3way(arr, low, high)
    quick_sort_3way(arr, low, lt - 1)
    quick_sort_3way(arr, gt + 1, high)
    
    return arr

def partition_3way(arr, low, high):
    """
    Three-way partitioning: elements < pivot, = pivot, > pivot
    """
    pivot = arr[low]
    i = low + 1
    lt = low
    gt = high
    
    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[i], arr[gt] = arr[gt], arr[i]
            gt -= 1
        else:
            i += 1
    
    return lt, gt

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", numbers)
    
    # Test regular quick sort
    sorted_array = quick_sort(numbers.copy())
    print("Quick Sort result:", sorted_array)
    
    # Test randomized quick sort
    randomized_result = quick_sort_randomized(numbers.copy())
    print("Randomized Quick Sort result:", randomized_result)
    
    # Test with duplicates
    duplicates = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    print("Array with duplicates:", duplicates)
    three_way_result = quick_sort_3way(duplicates.copy())
    print("3-way Quick Sort result:", three_way_result)`,
      java: `// Quick Sort Implementation
// Time Complexity: O(n log n) average, O(n²) worst case
// Space Complexity: O(log n)

import java.util.Arrays;
import java.util.Random;

public class QuickSort {
    private static Random random = new Random();
    
    /**
     * Sorts an array using the Quick Sort algorithm.
     * 
     * @param arr The array to be sorted
     * @param low Starting index
     * @param high Ending index
     */
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pivotIndex = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    /**
     * Partitions the array around a pivot element.
     * 
     * @param arr Array to partition
     * @param low Starting index
     * @param high Ending index
     * @return Index of the pivot after partitioning
     */
    private static int partition(int[] arr, int low, int high) {
        // Choose the rightmost element as pivot
        int pivot = arr[high];
        int i = low - 1; // Index of smaller element
        
        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        // Place pivot in correct position
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    /**
     * Randomized Quick Sort for better average performance.
     */
    public static void quickSortRandomized(int[] arr, int low, int high) {
        if (low < high) {
            // Randomize pivot to avoid worst case
            int randomIndex = random.nextInt(high - low + 1) + low;
            swap(arr, randomIndex, high);
            
            int pivotIndex = partition(arr, low, high);
            quickSortRandomized(arr, low, pivotIndex - 1);
            quickSortRandomized(arr, pivotIndex + 1, high);
        }
    }
    
    /**
     * Three-way partitioning Quick Sort for arrays with many duplicates.
     */
    public static void quickSort3Way(int[] arr, int low, int high) {
        if (low >= high) return;
        
        int[] bounds = partition3Way(arr, low, high);
        quickSort3Way(arr, low, bounds[0] - 1);
        quickSort3Way(arr, bounds[1] + 1, high);
    }
    
    private static int[] partition3Way(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low + 1;
        int lt = low;
        int gt = high;
        
        while (i <= gt) {
            if (arr[i] < pivot) {
                swap(arr, lt, i);
                lt++;
                i++;
            } else if (arr[i] > pivot) {
                swap(arr, i, gt);
                gt--;
            } else {
                i++;
            }
        }
        
        return new int[]{lt, gt};
    }
    
    /**
     * Swaps two elements in an array.
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    // Wrapper methods for easier usage
    public static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }
    
    public static void quickSortRandomized(int[] arr) {
        quickSortRandomized(arr, 0, arr.length - 1);
    }
    
    public static void quickSort3Way(int[] arr) {
        quickSort3Way(arr, 0, arr.length - 1);
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        int[] copy1 = numbers.clone();
        quickSort(copy1);
        System.out.println("Quick Sort result: " + Arrays.toString(copy1));
        
        int[] copy2 = numbers.clone();
        quickSortRandomized(copy2);
        System.out.println("Randomized Quick Sort result: " + Arrays.toString(copy2));
        
        // Test with duplicates
        int[] duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        System.out.println("Array with duplicates: " + Arrays.toString(duplicates));
        quickSort3Way(duplicates);
        System.out.println("3-way Quick Sort result: " + Arrays.toString(duplicates));
    }
}`,
      cpp: `// Quick Sort Implementation
// Time Complexity: O(n log n) average, O(n²) worst case
// Space Complexity: O(log n)

#include <iostream>
#include <vector>
#include <random>
#include <algorithm>

class QuickSort {
private:
    static std::random_device rd;
    static std::mt19937 gen;
    
public:
    /**
     * Sorts a vector using the Quick Sort algorithm.
     * 
     * @param arr Vector to be sorted
     * @param low Starting index
     * @param high Ending index
     */
    static void quickSort(std::vector<int>& arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pivotIndex = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
private:
    /**
     * Partitions the array around a pivot element.
     * 
     * @param arr Vector to partition
     * @param low Starting index
     * @param high Ending index
     * @return Index of the pivot after partitioning
     */
    static int partition(std::vector<int>& arr, int low, int high) {
        // Choose the rightmost element as pivot
        int pivot = arr[high];
        int i = low - 1; // Index of smaller element
        
        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                std::swap(arr[i], arr[j]);
            }
        }
        
        // Place pivot in correct position
        std::swap(arr[i + 1], arr[high]);
        return i + 1;
    }
    
public:
    /**
     * Randomized Quick Sort for better average performance.
     */
    static void quickSortRandomized(std::vector<int>& arr, int low, int high) {
        if (low < high) {
            // Randomize pivot to avoid worst case
            std::uniform_int_distribution<> dis(low, high);
            int randomIndex = dis(gen);
            std::swap(arr[randomIndex], arr[high]);
            
            int pivotIndex = partition(arr, low, high);
            quickSortRandomized(arr, low, pivotIndex - 1);
            quickSortRandomized(arr, pivotIndex + 1, high);
        }
    }
    
    /**
     * Three-way partitioning Quick Sort for arrays with many duplicates.
     */
    static void quickSort3Way(std::vector<int>& arr, int low, int high) {
        if (low >= high) return;
        
        auto bounds = partition3Way(arr, low, high);
        quickSort3Way(arr, low, bounds.first - 1);
        quickSort3Way(arr, bounds.second + 1, high);
    }
    
private:
    static std::pair<int, int> partition3Way(std::vector<int>& arr, int low, int high) {
        int pivot = arr[low];
        int i = low + 1;
        int lt = low;
        int gt = high;
        
        while (i <= gt) {
            if (arr[i] < pivot) {
                std::swap(arr[lt], arr[i]);
                lt++;
                i++;
            } else if (arr[i] > pivot) {
                std::swap(arr[i], arr[gt]);
                gt--;
            } else {
                i++;
            }
        }
        
        return {lt, gt};
    }
    
public:
    // Wrapper methods for easier usage
    static void quickSort(std::vector<int>& arr) {
        quickSort(arr, 0, arr.size() - 1);
    }
    
    static void quickSortRandomized(std::vector<int>& arr) {
        quickSortRandomized(arr, 0, arr.size() - 1);
    }
    
    static void quickSort3Way(std::vector<int>& arr) {
        quickSort3Way(arr, 0, arr.size() - 1);
    }
    
    /**
     * Template version for any comparable type.
     */
    template<typename T>
    static void quickSort(std::vector<T>& arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    template<typename T>
    static int partition(std::vector<T>& arr, int low, int high) {
        T pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                std::swap(arr[i], arr[j]);
            }
        }
        
        std::swap(arr[i + 1], arr[high]);
        return i + 1;
    }
};

// Static member definitions
std::random_device QuickSort::rd;
std::mt19937 QuickSort::gen(QuickSort::rd());

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    auto copy1 = numbers;
    QuickSort::quickSort(copy1);
    std::cout << "Quick Sort result: ";
    for (int num : copy1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    auto copy2 = numbers;
    QuickSort::quickSortRandomized(copy2);
    std::cout << "Randomized Quick Sort result: ";
    for (int num : copy2) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Test with duplicates
    std::vector<int> duplicates = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
    std::cout << "Array with duplicates: ";
    for (int num : duplicates) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    QuickSort::quickSort3Way(duplicates);
    std::cout << "3-way Quick Sort result: ";
    for (int num : duplicates) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
    },
    testCases: [
      { input: "[64, 34, 25, 12, 22, 11, 90]", expected: "[11, 12, 22, 25, 34, 64, 90]" },
      { input: "[5, 2, 8, 1, 9]", expected: "[1, 2, 5, 8, 9]" },
      { input: "[1]", expected: "[1]" },
      { input: "[]", expected: "[]" },
      { input: "[3, 3, 3, 3]", expected: "[3, 3, 3, 3]", hidden: true },
      { input: "[9, 8, 7, 6, 5]", expected: "[5, 6, 7, 8, 9]", hidden: true },
    ],
    relatedAlgorithms: [1, 3, 4],
    applications: ["General purpose sorting", "Database indexing", "Computational geometry"],
    author: "Algorithm Team",
    dateAdded: "2024-01-15",
    lastUpdated: "2024-01-20",
  },
  // Continue with more algorithms...
  {
    id: 3,
    name: "Merge Sort",
    category: "Sorting",
    difficulty: "Medium",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Stable divide-and-conquer sorting algorithm with guaranteed O(n log n) performance",
    detailedDescription:
      "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves. It's stable and has consistent O(n log n) performance.",
    languages: ["JavaScript", "Python", "Java", "C++"],
    rating: 4.7,
    views: 65230,
    implementations: 20,
    tags: ["divide-conquer", "stable", "recursive", "external-sorting"],
    examples: [
      {
        input: "[64, 34, 25, 12, 22, 11, 90]",
        output: "[11, 12, 22, 25, 34, 64, 90]",
        explanation: "Array is recursively divided and merged in sorted order",
      },
    ],
    constraints: ["1 ≤ array length ≤ 10^6", "Elements must be comparable"],
    hints: [
      "Divide the array into two halves",
      "Recursively sort both halves",
      "Merge the sorted halves back together",
    ],
    code: {
      javascript: `// Merge Sort Implementation
// Time Complexity: O(n log n) - all cases
// Space Complexity: O(n)

function mergeSort(arr) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Compare elements from both arrays and merge in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    // Add remaining elements from both arrays
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    
    return result;
}

// In-place merge sort to reduce space complexity
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return arr;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    // Recursively sort both halves
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);
    
    // Merge the sorted halves
    mergeInPlace(arr, left, mid, right);
    
    return arr;
}

function mergeInPlace(arr, left, mid, right) {
    // Create temporary arrays for left and right subarrays
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    // Merge the temporary arrays back into arr[left..right]
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

// Bottom-up merge sort (iterative)
function mergeSortBottomUp(arr) {
    const n = arr.length;
    
    // Merge subarrays in bottom-up manner
    for (let size = 1; size < n; size *= 2) {
        for (let left = 0; left < n - size; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            
            mergeInPlace(arr, left, mid, right);
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);
console.log("Merge Sort result:", mergeSort([...numbers]));

// Test in-place version
const numbers2 = [64, 34, 25, 12, 22, 11, 90];
console.log("In-place Merge Sort result:", mergeSortInPlace(numbers2));`,
      python: `# Merge Sort Implementation
# Time Complexity: O(n log n) - all cases
# Space Complexity: O(n)

def merge_sort(arr):
    """
    Sorts an array using the Merge Sort algorithm.
    
    Args:
        arr: List to be sorted
        
    Returns:
        Sorted list
    """
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursively sort both halves and merge them
    return merge(merge_sort(left), merge_sort(right))

def merge(left, right):
    """
    Merges two sorted arrays into one sorted array.
    
    Args:
        left: First sorted array
        right: Second sorted array
        
    Returns:
        Merged sorted array
    """
    result = []
    left_index = 0
    right_index = 0
    
    # Compare elements from both arrays and merge in sorted order
    while left_index < len(left) and right_index < len(right):
        if left[left_index] <= right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1
    
    # Add remaining elements from both arrays
    result.extend(left[left_index:])
    result.extend(right[right_index:])
    
    return result

def merge_sort_in_place(arr, left=0, right=None):
    """
    In-place merge sort to reduce space complexity.
    """
    if right is None:
        right = len(arr) - 1
    
    if left >= right:
        return arr
    
    mid = (left + right) // 2
    
    # Recursively sort both halves
    merge_sort_in_place(arr, left, mid)
    merge_sort_in_place(arr, mid + 1, right)
    
    # Merge the sorted halves
    merge_in_place(arr, left, mid, right)
    
    return arr

def merge_in_place(arr, left, mid, right):
    """
    Merges two sorted subarrays in place.
    """
    # Create temporary arrays for left and right subarrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge the temporary arrays back into arr[left..right]
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

def merge_sort_bottom_up(arr):
    """
    Bottom-up merge sort (iterative approach).
    """
    n = len(arr)
    size = 1
    
    # Merge subarrays in bottom-up manner
    while size < n:
        left = 0
        while left < n - size:
            mid = left + size - 1
            right = min(left + 2 * size - 1, n - 1)
            
            merge_in_place(arr, left, mid, right)
            left += 2 * size
        
        size *= 2
    
    return arr

def merge_sort_with_steps(arr):
    """
    Merge sort with step-by-step visualization.
    """
    steps = []
    
    def merge_sort_helper(arr, depth=0):
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]
        
        steps.append({
            'action': 'divide',
            'array': arr.copy(),
            'left': left.copy(),
            'right': right.copy(),
            'depth': depth
        })
        
        sorted_left = merge_sort_helper(left, depth + 1)
        sorted_right = merge_sort_helper(right, depth + 1)
        
        merged = merge(sorted_left, sorted_right)
        
        steps.append({
            'action': 'merge',
            'left': sorted_left,
            'right': sorted_right,
            'result': merged.copy(),
            'depth': depth
        })
        
        return merged
    
    result = merge_sort_helper(arr)
    return result, steps

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", numbers)
    
    # Test regular merge sort
    sorted_array = merge_sort(numbers.copy())
    print("Merge Sort result:", sorted_array)
    
    # Test in-place merge sort
    in_place_array = numbers.copy()
    merge_sort_in_place(in_place_array)
    print("In-place Merge Sort result:", in_place_array)
    
    # Test bottom-up merge sort
    bottom_up_array = numbers.copy()
    merge_sort_bottom_up(bottom_up_array)
    print("Bottom-up Merge Sort result:", bottom_up_array)
    
    # Test with steps
    result, steps = merge_sort_with_steps(numbers.copy())
    print("\\nStep-by-step process:")
    for i, step in enumerate(steps):
        if step['action'] == 'divide':
            print(f"Step {i+1}: Divide {step['array']} into {step['left']} and {step['right']}")
        else:
            print(f"Step {i+1}: Merge {step['left']} and {step['right']} -> {step['result']}")`,
      java: `// Merge Sort Implementation
// Time Complexity: O(n log n) - all cases
// Space Complexity: O(n)

import java.util.Arrays;

public class MergeSort {
    
    /**
     * Sorts an array using the Merge Sort algorithm.
     * 
     * @param arr The array to be sorted
     * @return Sorted array
     */
    public static int[] mergeSort(int[] arr) {
        // Base case: arrays with 0 or 1 element are already sorted
        if (arr.length <= 1) {
            return arr;
        }
        
        // Divide the array into two halves
        int mid = arr.length / 2;
        int[] left = Arrays.copyOfRange(arr, 0, mid);
        int[] right = Arrays.copyOfRange(arr, mid, arr.length);
        
        // Recursively sort both halves and merge them
        return merge(mergeSort(left), mergeSort(right));
    }
    
    /**
     * Merges two sorted arrays into one sorted array.
     * 
     * @param left First sorted array
     * @param right Second sorted array
     * @return Merged sorted array
     */
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int leftIndex = 0, rightIndex = 0, resultIndex = 0;
        
        // Compare elements from both arrays and merge in sorted order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result[resultIndex] = left[leftIndex];
                leftIndex++;
            } else {
                result[resultIndex] = right[rightIndex];
                rightIndex++;
            }
            resultIndex++;
        }
        
        // Add remaining elements from both arrays
        while (leftIndex < left.length) {
            result[resultIndex] = left[leftIndex];
            leftIndex++;
            resultIndex++;
        }
        
        while (rightIndex < right.length) {
            result[resultIndex] = right[rightIndex];
            rightIndex++;
            resultIndex++;
        }
        
        return result;
    }
    
    /**
     * In-place merge sort to reduce space complexity.
     */
    public static void mergeSortInPlace(int[] arr, int left, int right) {
        if (left >= right) {
            return;
        }
        
        int mid = left + (right - left) / 2;
        
        // Recursively sort both halves
        mergeSortInPlace(arr, left, mid);
        mergeSortInPlace(arr, mid + 1, right);
        
        // Merge the sorted halves
        mergeInPlace(arr, left, mid, right);
    }
    
    private static void mergeInPlace(int[] arr, int left, int mid, int right) {
        // Create temporary arrays for left and right subarrays
        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
        
        int i = 0, j = 0, k = left;
        
        // Merge the temporary arrays back into arr[left..right]
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    /**
     * Bottom-up merge sort (iterative approach).
     */
    public static void mergeSortBottomUp(int[] arr) {
        int n = arr.length;
        
        // Merge subarrays in bottom-up manner
        for (int size = 1; size < n; size *= 2) {
            for (int left = 0; left < n - size; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min(left + 2 * size - 1, n - 1);
                
                mergeInPlace(arr, left, mid, right);
            }
        }
    }
    
    /**
     * Generic merge sort for any Comparable type.
     */
    public static <T extends Comparable<T>> T[] mergeSort(T[] arr) {
        if (arr.length <= 1) {
            return arr;
        }
        
        int mid = arr.length / 2;
        T[] left = Arrays.copyOfRange(arr, 0, mid);
        T[] right = Arrays.copyOfRange(arr, mid, arr.length);
        
        return merge(mergeSort(left), mergeSort(right));
    }
    
    @SuppressWarnings("unchecked")
    private static <T extends Comparable<T>> T[] merge(T[] left, T[] right) {
        T[] result = (T[]) new Comparable[left.length + right.length];
        int leftIndex = 0, rightIndex = 0, resultIndex = 0;
        
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].compareTo(right[rightIndex]) <= 0) {
                result[resultIndex] = left[leftIndex];
                leftIndex++;
            } else {
                result[resultIndex] = right[rightIndex];
                rightIndex++;
            }
            resultIndex++;
        }
        
        while (leftIndex < left.length) {
            result[resultIndex] = left[leftIndex];
            leftIndex++;
            resultIndex++;
        }
        
        while (rightIndex < right.length) {
            result[resultIndex] = right[rightIndex];
            rightIndex++;
            resultIndex++;
        }
        
        return result;
    }
    
    // Wrapper methods for easier usage
    public static void mergeSortInPlace(int[] arr) {
        mergeSortInPlace(arr, 0, arr.length - 1);
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(numbers));
        
        // Test regular merge sort
        int[] sorted = mergeSort(numbers.clone());
        System.out.println("Merge Sort result: " + Arrays.toString(sorted));
        
        // Test in-place merge sort
        int[] inPlace = numbers.clone();
        mergeSortInPlace(inPlace);
        System.out.println("In-place Merge Sort result: " + Arrays.toString(inPlace));
        
        // Test bottom-up merge sort
        int[] bottomUp = numbers.clone();
        mergeSortBottomUp(bottomUp);
        System.out.println("Bottom-up Merge Sort result: " + Arrays.toString(bottomUp));
        
        // Test with strings
        String[] words = {"banana", "apple", "cherry", "date", "elderberry"};
        System.out.println("Original strings: " + Arrays.toString(words));
        String[] sortedWords = mergeSort(words);
        System.out.println("Sorted strings: " + Arrays.toString(sortedWords));
    }
}`,
      cpp: `// Merge Sort Implementation
// Time Complexity: O(n log n) - all cases
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <algorithm>

class MergeSort {
public:
    /**
     * Sorts a vector using the Merge Sort algorithm.
     * 
     * @param arr Vector to be sorted
     * @return Sorted vector
     */
    static std::vector<int> mergeSort(const std::vector<int>& arr) {
        // Base case: arrays with 0 or 1 element are already sorted
        if (arr.size() <= 1) {
            return arr;
        }
        
        // Divide the array into two halves
        int mid = arr.size() / 2;
        std::vector<int> left(arr.begin(), arr.begin() + mid);
        std::vector<int> right(arr.begin() + mid, arr.end());
        
        // Recursively sort both halves and merge them
        return merge(mergeSort(left), mergeSort(right));
    }
    
private:
    /**
     * Merges two sorted vectors into one sorted vector.
     * 
     * @param left First sorted vector
     * @param right Second sorted vector
     * @return Merged sorted vector
     */
    static std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
        std::vector<int> result;
        result.reserve(left.size() + right.size());
        
        int leftIndex = 0, rightIndex = 0;
        
        // Compare elements from both vectors and merge in sorted order
        while (leftIndex < left.size() && rightIndex < right.size()) {
            if (left[leftIndex] <= right[rightIndex]) {
                result.push_back(left[leftIndex]);
                leftIndex++;
            } else {
                result.push_back(right[rightIndex]);
                rightIndex++;
            }
        }
        
        // Add remaining elements from both vectors
        while (leftIndex < left.size()) {
            result.push_back(left[leftIndex]);
            leftIndex++;
        }
        
        while (rightIndex < right.size()) {
            result.push_back(right[rightIndex]);
            rightIndex++;
        }
        
        return result;
    }
    
public:
    /**
     * In-place merge sort to reduce space complexity.
     */
    static void mergeSortInPlace(std::vector<int>& arr, int left, int right) {
        if (left >= right) {
            return;
        }
        
        int mid = left + (right - left) / 2;
        
        // Recursively sort both halves
        mergeSortInPlace(arr, left, mid);
        mergeSortInPlace(arr, mid + 1, right);
        
        // Merge the sorted halves
        mergeInPlace(arr, left, mid, right);
    }
    
private:
    static void mergeInPlace(std::vector<int>& arr, int left, int mid, int right) {
        // Create temporary vectors for left and right subarrays
        std::vector<int> leftArr(arr.begin() + left, arr.begin() + mid + 1);
        std::vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
        
        int i = 0, j = 0, k = left;
        
        // Merge the temporary vectors back into arr[left..right]
        while (i < leftArr.size() && j < rightArr.size()) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArr.size()) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < rightArr.size()) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
public:
    /**
     * Bottom-up merge sort (iterative approach).
     */
    static void mergeSortBottomUp(std::vector<int>& arr) {
        int n = arr.size();
        
        // Merge subarrays in bottom-up manner
        for (int size = 1; size < n; size *= 2) {
            for (int left = 0; left < n - size; left += 2 * size) {
                int mid = left + size - 1;
                int right = std::min(left + 2 * size - 1, n - 1);
                
                mergeInPlace(arr, left, mid, right);
            }
        }
    }
    
    /**
     * Template version for any comparable type.
     */
    template<typename T>
    static std::vector<T> mergeSort(const std::vector<T>& arr) {
        if (arr.size() <= 1) {
            return arr;
        }
        
        int mid = arr.size() / 2;
        std::vector<T> left(arr.begin(), arr.begin() + mid);
        std::vector<T> right(arr.begin() + mid, arr.end());
        
        return merge(mergeSort(left), mergeSort(right));
    }
    
    template<typename T>
    static std::vector<T> merge(const std::vector<T>& left, const std::vector<T>& right) {
        std::vector<T> result;
        result.reserve(left.size() + right.size());
        
        int leftIndex = 0, rightIndex = 0;
        
        while (leftIndex < left.size() && rightIndex < right.size()) {
            if (left[leftIndex] <= right[rightIndex]) {
                result.push_back(left[leftIndex]);
                leftIndex++;
            } else {
                result.push_back(right[rightIndex]);
                rightIndex++;
            }
        }
        
        while (leftIndex < left.size()) {
            result.push_back(left[leftIndex]);
            leftIndex++;
        }
        
        while (rightIndex < right.size()) {
            result.push_back(right[rightIndex]);
            rightIndex++;
        }
        
        return result;
    }
    
    // Wrapper method for easier usage
    static void mergeSortInPlace(std::vector<int>& arr) {
        mergeSortInPlace(arr, 0, arr.size() - 1);
    }
};

// Example usage
int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Test regular merge sort
    
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Test regular merge sort
    auto sorted = MergeSort::mergeSort(numbers);
    std::cout << "Merge Sort result: ";
    for (int num : sorted) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Test in-place merge sort
    auto inPlace = numbers;
    MergeSort::mergeSortInPlace(inPlace);
    std::cout << "In-place Merge Sort result: ";
    for (int num : inPlace) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Test bottom-up merge sort
    auto bottomUp = numbers;
    MergeSort::mergeSortBottomUp(bottomUp);
    std::cout << "Bottom-up Merge Sort result: ";
    for (int num : bottomUp) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Test with strings
    std::vector<std::string> words = {"banana", "apple", "cherry", "date", "elderberry"};
    std::cout << "Original strings: ";
    for (const auto& word : words) {
        std::cout << word << " ";
    }
    std::cout << std::endl;
    
    auto sortedWords = MergeSort::mergeSort(words);
    std::cout << "Sorted strings: ";
    for (const auto& word : sortedWords) {
        std::cout << word << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
    },
    testCases: [
      { input: "[64, 34, 25, 12, 22, 11, 90]", expected: "[11, 12, 22, 25, 34, 64, 90]" },
      { input: "[5, 2, 8, 1, 9]", expected: "[1, 2, 5, 8, 9]" },
      { input: "[1]", expected: "[1]" },
      { input: "[]", expected: "[]" },
      { input: "[3, 3, 3, 3]", expected: "[3, 3, 3, 3]", hidden: true },
      { input: "[9, 8, 7, 6, 5, 4, 3, 2, 1]", expected: "[1, 2, 3, 4, 5, 6, 7, 8, 9]", hidden: true },
    ],
    relatedAlgorithms: [1, 2, 4],
    applications: ["External sorting", "Stable sorting requirements", "Large datasets"],
    author: "Algorithm Team",
    dateAdded: "2024-01-15",
    lastUpdated: "2024-01-20",
  },

  // SEARCHING ALGORITHMS
  {
    id: 4,
    name: "Binary Search",
    category: "Searching",
    difficulty: "Easy",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Efficient search algorithm for sorted arrays using divide-and-conquer",
    detailedDescription:
      "Binary Search is a search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array and eliminates half of the search space in each iteration.",
    languages: ["JavaScript", "Python", "Java", "C++", "Go"],
    rating: 4.9,
    views: 89340,
    implementations: 30,
    tags: ["divide-conquer", "iterative", "recursive", "logarithmic"],
    examples: [
      {
        input: "arr = [1, 3, 5, 7, 9, 11, 13, 15], target = 7",
        output: "3",
        explanation: "Element 7 is found at index 3",
      },
    ],
    constraints: ["Array must be sorted", "1 ≤ array length ≤ 10^6"],
    hints: [
      "Array must be sorted first",
      "Compare target with middle element",
      "Eliminate half of the search space in each iteration",
    ],
    code: {
      javascript: `// Binary Search Implementation
// Time Complexity: O(log n)
// Space Complexity: O(1) iterative, O(log n) recursive

/**
 * Iterative Binary Search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Element to find
 * @returns {number} Index of target element, -1 if not found
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Calculate middle index (avoid overflow)
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found the target
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}

/**
 * Recursive Binary Search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Element to find
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} Index of target element, -1 if not found
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1; // Base case: target not found
    }
    
    const mid = Math.floor(left + (right - left) / 2);
    
    if (arr[mid] === target) {
        return mid; // Found the target
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

/**
 * Find the leftmost occurrence of target
 */
function binarySearchLeft(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Find the rightmost occurrence of target
 */
function binarySearchRight(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Find insertion point for element not in array
 */
function findInsertionPoint(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Insertion point
}

/**
 * Search in rotated sorted array
 */
function searchRotatedArray(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        }
        
        // Check which half is sorted
        if (arr[left] <= arr[mid]) {
            // Left half is sorted
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", sortedArray);

const target = 7;
const index = binarySearch(sortedArray, target);
console.log(\`Element \${target} found at index: \${index}\`);

// Test with duplicates
const duplicates = [1, 2, 2, 2, 3, 4, 5];
console.log("Array with duplicates:", duplicates);
console.log("Leftmost 2 at index:", binarySearchLeft(duplicates, 2));
console.log("Rightmost 2 at index:", binarySearchRight(duplicates, 2));`,
      python: `# Binary Search Implementation
# Time Complexity: O(log n)
# Space Complexity: O(1) iterative, O(log n) recursive

def binary_search(arr, target):
    """
    Iterative Binary Search
    
    Args:
        arr: Sorted list to search in
        target: Element to find
    
    Returns:
        Index of target element, -1 if not found
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        # Calculate middle index (avoid overflow)
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid  # Found the target
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Target not found

def binary_search_recursive(arr, target, left=0, right=None):
    """
    Recursive Binary Search
    
    Args:
        arr: Sorted list to search in
        target: Element to find
        left: Left boundary
        right: Right boundary
    
    Returns:
        Index of target element, -1 if not found
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1  # Base case: target not found
    
    mid = left + (right - left) // 2
    
    if arr[mid] == target:
        return mid  # Found the target
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

def binary_search_left(arr, target):
    """
    Find the leftmost occurrence of target
    """
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

def binary_search_right(arr, target):
    """
    Find the rightmost occurrence of target
    """
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

def find_insertion_point(arr, target):
    """
    Find the insertion point for target in sorted array
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left  # Insertion point

def search_rotated_array(arr, target):
    """
    Search in rotated sorted array
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        
        # Check which half is sorted
        if arr[left] <= arr[mid]:
            # Left half is sorted
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

def find_range(arr, target):
    """
    Find the range of indices where target appears
    """
    left_idx = binary_search_left(arr, target)
    if left_idx == -1:
        return [-1, -1]
    
    right_idx = binary_search_right(arr, target)
    return [left_idx, right_idx]

def search_2d_matrix(matrix, target):
    """
    Search in a 2D matrix where each row and column is sorted
    """
    if not matrix or not matrix[0]:
        return False
    
    rows, cols = len(matrix), len(matrix[0])
    row, col = 0, cols - 1
    
    while row < rows and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1
        else:
            row += 1
    
    return False

# Using bisect module for more advanced operations
import bisect

def binary_search_bisect(arr, target):
    """
    Using Python's bisect module for binary search
    """
    idx = bisect.bisect_left(arr, target)
    if idx < len(arr) and arr[idx] == target:
        return idx
    return -1

# Example usage
if __name__ == "__main__":
    sorted_array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    print("Array:", sorted_array)
    
    target = 7
    index = binary_search(sorted_array, target)
    print(f"Element {target} found at index: {index}")
    
    # Test recursive version
    recursive_index = binary_search_recursive(sorted_array, target)
    print(f"Recursive search result: {recursive_index}")
    
    # Test with duplicates
    duplicates = [1, 2, 2, 2, 3, 4, 5]
    print("Array with duplicates:", duplicates)
    print("Leftmost 2 at index:", binary_search_left(duplicates, 2))
    print("Rightmost 2 at index:", binary_search_right(duplicates, 2))
    print("Range of 2:", find_range(duplicates, 2))
    
    # Test rotated array
    rotated = [4, 5, 6, 7, 0, 1, 2]
    print("Rotated array:", rotated)
    print("Search 0 in rotated array:", search_rotated_array(rotated, 0))
    
    # Test 2D matrix
    matrix = [
        [1,  4,  7,  11],
        [2,  5,  8,  12],
        [3,  6,  9,  16],
        [10, 13, 14, 17]
    ]
    print("2D Matrix search for 5:", search_2d_matrix(matrix, 5))`,
      java: `// Binary Search Implementation
// Time Complexity: O(log n)
// Space Complexity: O(1) iterative, O(log n) recursive

import java.util.Arrays;

public class BinarySearch {
    
    /**
     * Iterative Binary Search
     * 
     * @param arr Sorted array to search in
     * @param target Element to find
     * @return Index of target element, -1 if not found
     */
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            // Calculate middle index (avoid overflow)
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid; // Found the target
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        
        return -1; // Target not found
    }
    
    /**
     * Recursive Binary Search
     * 
     * @param arr Sorted array to search in
     * @param target Element to find
     * @param left Left boundary
     * @param right Right boundary
     * @return Index of target element, -1 if not found
     */
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1; // Base case: target not found
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found the target
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }
    
    /**
     * Find the leftmost occurrence of target
     */
    public static int binarySearchLeft(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    /**
     * Find the rightmost occurrence of target
     */
    public static int binarySearchRight(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    /**
     * Find insertion point for target in sorted array
     */
    public static int findInsertionPoint(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left; // Insertion point
    }
    
    /**
     * Search in rotated sorted array
     */
    public static int searchRotatedArray(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            }
            
            // Check which half is sorted
            if (arr[left] <= arr[mid]) {
                // Left half is sorted
                if (target >= arr[left] && target < arr[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > arr[mid] && target <= arr[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Find the range of indices where target appears
     */
    public static int[] findRange(int[] arr, int target) {
        int leftIdx = binarySearchLeft(arr, target);
        if (leftIdx == -1) {
            return new int[]{-1, -1};
        }
        
        int rightIdx = binarySearchRight(arr, target);
        return new int[]{leftIdx, rightIdx};
    }
    
    /**
     * Search in a 2D matrix where each row and column is sorted
     */
    public static boolean search2DMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        int row = 0;
        int col = cols - 1;
        
        while (row < rows && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;
            } else {
                row++;
            }
        }
        
        return false;
    }
    
    /**
     * Generic binary search for any Comparable type
     */
    public static <T extends Comparable<T>> int binarySearch(T[] arr, T target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int cmp = arr[mid].compareTo(target);
            
            if (cmp == 0) {
                return mid;
            } else if (cmp < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    // Wrapper methods for easier usage
    public static int binarySearchRecursive(int[] arr, int target) {
        return binarySearchRecursive(arr, target, 0, arr.length - 1);
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] sortedArray = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        System.out.println("Array: " + Arrays.toString(sortedArray));
        
        int target = 7;
        int index = binarySearch(sortedArray, target);
        System.out.println("Element " + target + " found at index: " + index);
        
        // Test recursive version
        int recursiveIndex = binarySearchRecursive(sortedArray, target);
        System.out.println("Recursive search result: " + recursiveIndex);
        
        // Test with duplicates
        int[] duplicates = {1, 2, 2, 2, 3, 4, 5};
        System.out.println("Array with duplicates: " + Arrays.toString(duplicates));
        System.out.println("Leftmost 2 at index: " + binarySearchLeft(duplicates, 2));
        System.out.println("Rightmost 2 at index: " + binarySearchRight(duplicates, 2));
        System.out.println("Range of 2: " + Arrays.toString(findRange(duplicates, 2)));
        
        // Test rotated array
        int[] rotated = {4, 5, 6, 7, 0, 1, 2};
        System.out.println("Rotated array: " + Arrays.toString(rotated));
        System.out.println("Search 0 in rotated array: " + searchRotatedArray(rotated, 0));
        
        // Test 2D matrix
        int[][] matrix = {
            {1,  4,  7,  11},
            {2,  5,  8,  12},
            {3,  6,  9,  16},
            {10, 13, 14, 17}
        };
        System.out.println("2D Matrix search for 5: " + search2DMatrix(matrix, 5));
        
        // Test with strings
        String[] words = {"apple", "banana", "cherry", "date", "elderberry"};
        System.out.println("String array: " + Arrays.toString(words));
        System.out.println("Search 'cherry': " + binarySearch(words, "cherry"));
        
        // Using built-in Arrays.binarySearch
        System.out.println("Built-in search result: " + Arrays.binarySearch(sortedArray, target));
    }
}`,
      cpp: `// Binary Search Implementation
// Time Complexity: O(log n)
// Space Complexity: O(1) iterative, O(log n) recursive

#include <iostream>
#include <vector>
#include <algorithm>

class BinarySearch {
public:
    /**
     * Iterative Binary Search
     * 
     * @param arr Sorted vector to search in
     * @param target Element to find
     * @return Index of target element, -1 if not found
     */
    static int binarySearch(const std::vector<int>& arr, int target) {
        int left = 0;
        int right = arr.size() - 1;
        
        while (left <= right) {
            // Calculate middle index (avoid overflow)
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid; // Found the target
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        
        return -1; // Target not found
    }
    
    /**
     * Recursive Binary Search
     * 
     * @param arr Sorted vector to search in
     * @param target Element to find
     * @param left Left boundary
     * @param right Right boundary
     * @return Index of target element, -1 if not found
     */
    static int binarySearchRecursive(const std::vector<int>& arr, int target, int left, int right) {
        if (left > right) {
            return -1; // Base case: target not found
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found the target
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }
    
    /**
     * Find the leftmost occurrence of target
     */
    static int binarySearchLeft(const std::vector<int>& arr, int target) {
        int left = 0;
        int right = arr.size() - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    /**
     * Find the rightmost occurrence of target
     */
    static int binarySearchRight(const std::vector<int>& arr, int target) {
        int left = 0;
        int right = arr.size() - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    /**
     * Find insertion point for target in sorted array
     */
    static int findInsertionPoint(const std::vector<int>& arr, int target) {
        int left = 0;
        int right = arr.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left; // Insertion point
    }
    
    /**
     * Search in rotated sorted array
     */
    static int searchRotatedArray(const std::vector<int>& arr, int target) {
        int left = 0;
        int right = arr.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            }
            
            // Check which half is sorted
            if (arr[left] <= arr[mid]) {
                // Left half is sorted
                if (target >= arr[left] && target < arr[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > arr[mid] && target <= arr[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Find the range of indices where target appears
     */
    static std::pair<int, int> findRange(const std::vector<int>& arr, int target) {
        int leftIdx = binarySearchLeft(arr, target);
        if (leftIdx == -1) {
            return {-1, -1};
        }
        
        int rightIdx = binarySearchRight(arr, target);
        return {leftIdx, rightIdx};
    }
    
    /**
     * Search in a 2D matrix where each row and column is sorted
     */
    static bool search2DMatrix(const std::vector<std::vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) {
            return false;
        }
        
        int rows = matrix.size();
        int cols = matrix[0].size();
        int row = 0;
        int col = cols - 1;
        
        while (row < rows && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;
            } else {
                row++;
            }
        }
        
        return false;
    }
    
    /**
     * Template version for any comparable type
     */
    template<typename T>
    static int binarySearch(const std::vector<T>& arr, const T& target) {
        int left = 0;
        int right = arr.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    /**
     * Binary search with custom comparator
     */
    template<typename T, typename Compare>
    static int binarySearch(const std::vector<T>& arr, const T& target, Compare comp) {
        int left = 0;
        int right = arr.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (!comp(arr[mid], target) && !comp(target, arr[mid])) {
                return mid; // Elements are equal
            } else if (comp(arr[mid], target)) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    // Wrapper method for easier usage
    static int binarySearchRecursive(const std::vector<int>& arr, int target) {
        return binarySearchRecursive(arr, target, 0, arr.size() - 1);
    }
};

// Example usage
int main() {
    std::vector<int> sortedArray = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    
    std::cout << "Array: ";
    for (int num : sortedArray) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    int target = 7;
    int index = BinarySearch::binarySearch(sortedArray, target);
    std::cout << "Element " << target << " found at index: " << index << std::endl;
    
    // Test recursive version
    int recursiveIndex = BinarySearch::binarySearchRecursive(sortedArray, target);
    std::cout << "Recursive search result: " << recursiveIndex << std::endl;
    
    // Test with duplicates
    std::vector<int> duplicates = {1, 2, 2, 2, 3, 4, 5};
    std::cout << "Array with duplicates: ";
    for (int num : duplicates) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Leftmost 2 at index: " << BinarySearch::binarySearchLeft(duplicates, 2) << std::endl;
    std::cout << "Rightmost 2 at index: " << BinarySearch::binarySearchRight(duplicates, 2) << std::endl;
    
    auto range = BinarySearch::findRange(duplicates, 2);
    std::cout << "Range of 2: [" << range.first << ", " << range.second << "]" << std::endl;
    
    // Test rotated array
    std::vector<int> rotated = {4, 5, 6, 7, 0, 1, 2};
    std::cout << "Rotated array: ";
    for (int num : rotated) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    std::cout << "Search 0 in rotated array: " << BinarySearch::searchRotatedArray(rotated, 0) << std::endl;
    
    // Test 2D matrix
    std::vector<std::vector<int>> matrix = {
        {1,  4,  7,  11},
        {2,  5,  8,  12},
        {3,  6,  9,  16},
        {10, 13, 14, 17}
    };
    std::cout << "2D Matrix search for 5: " << (BinarySearch::search2DMatrix(matrix, 5) ? "Found" : "Not found") << std::endl;
    
    // Test with strings
    std::vector<std::string> words = {"apple", "banana", "cherry", "date", "elderberry"};
    std::cout << "String array: ";
    for (const auto& word : words) {
        std::cout << word << " ";
    }
    std::cout << std::endl;
    std::cout << "Search 'cherry': " << BinarySearch::binarySearch(words, std::string("cherry")) << std::endl;
    
    // Using STL binary search functions
    bool found = std::binary_search(sortedArray.begin(), sortedArray.end(), target);
    std::cout << "STL binary_search result: " << (found ? "Found" : "Not found") << std::endl;
    
    auto it = std::lower_bound(sortedArray.begin(), sortedArray.end(), target);
    if (it != sortedArray.end() && *it == target) {
        std::cout << "STL lower_bound result: " << (it - sortedArray.begin()) << std::endl;
    }
    
    return 0;
}`,
    },
    testCases: [
      { input: "[1, 3, 5, 7, 9, 11, 13, 15], 7", expected: "3" },
      { input: "[1, 3, 5, 7, 9, 11, 13, 15], 1", expected: "0" },
      { input: "[1, 3, 5, 7, 9, 11, 13, 15], 15", expected: "7" },
      { input: "[1, 3, 5, 7, 9, 11, 13, 15], 4", expected: "-1" },
      { input: "[5], 5", expected: "0", hidden: true },
      { input: "[], 1", expected: "-1", hidden: true },
    ],
    relatedAlgorithms: [5, 6, 7],
    applications: ["Database indexing", "Dictionary lookups", "Finding elements in sorted data"],
    author: "Algorithm Team",
    dateAdded: "2024-01-15",
    lastUpdated: "2024-01-20",
  },
  // Add more algorithms here...
]

export function getAlgorithmById(id: number): Algorithm | undefined {
  return algorithmDatabase.find((algo) => algo.id === id)
}

export function getAlgorithmsByCategory(category: string): Algorithm[] {
  if (category === "All") return algorithmDatabase
  return algorithmDatabase.filter((algo) => algo.category === category)
}

export function getAlgorithmsByDifficulty(difficulty: string): Algorithm[] {
  if (difficulty === "All") return algorithmDatabase
  return algorithmDatabase.filter((algo) => algo.difficulty === difficulty)
}

export function searchAlgorithms(query: string): Algorithm[] {
  const lowercaseQuery = query.toLowerCase()
  return algorithmDatabase.filter(
    (algo) =>
      algo.name.toLowerCase().includes(lowercaseQuery) ||
      algo.description.toLowerCase().includes(lowercaseQuery) ||
      algo.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      algo.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function getRelatedAlgorithms(algorithmId: number): Algorithm[] {
  const algorithm = getAlgorithmById(algorithmId)
  if (!algorithm) return []

  return algorithm.relatedAlgorithms.map((id) => getAlgorithmById(id)).filter(Boolean) as Algorithm[]
}

export const categories = [
  "All",
  "Sorting",
  "Searching",
  "Graph",
  "Dynamic Programming",
  "Tree",
  "String",
  "Array",
  "Linked List",
  "Stack",
  "Queue",
  "Hash Table",
  "Heap",
  "Backtracking",
  "Greedy",
  "Divide and Conquer",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Bit Manipulation",
]

export const difficulties = ["All", "Easy", "Medium", "Hard"]

export const languages = ["All", "JavaScript", "Python", "Java", "C++", "Go", "Rust", "TypeScript"]
