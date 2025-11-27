Travelling salesperson is a classic graph problem. Here, the cost of moving from city `i` to city `j` is given. The task is to find a path, starting from the city `0` encompassing all the cities at most once whose cost is the smallest.

## Problem Statement:

Given a matrix `M` of size `N` where `M[i][j]` denotes the cost of moving from city `i` to city `j`. Your task is to complete a tour from the city `0` (0-based index) to all other cities such that you visit each city at most once and then at the end come back to the city `0` in min cost.

Input Format

The first line of input contains an integer T denoting the no of test cases. Then T test cases follow. Each test case contains an integer N denoting the size of the matrix then in the next line are N*N space separated values of the matrix M.

Constraints

`1<=T<=15, 1<=N<=12, 1<=M[][]<10000`

Output Format

For each test case print the required result denoting the min cost of the tour in a new line.

Sample Input

```
220 111112 030 1000 50005000 0 10001000 5000 0
```

Sample Output

```
2233000
```

Input Visualization

<figure class="align-center">
  <img src="/assets/input-visualization-travelling-salesman.png" alt="Input visualization through graph">
</figure>

## Algorithm

- Take the graph input into a 2D matrix.
- Initialize a visited array of `n` sizes with `0`.
- Set `visited[0]` to `1`.
- Call traverse with arr, cur node (`0`), number of nodes visited (`cnt = 1`), total cost (`0`), Since already in `0th` node so the cost of going from `0th` node to `0th` node is `0`.
- Check if `cnt == n`. If true then we have visited all the nodes. Put the minimum of ans and ( total + cost of going from the current node to node 0) into `ans`. Then return.
- Iterate through all the nodes.
- If the `ith` node is not visited and it’s a valid node make `visited[cur]=1`. Call traverse by making ith node equal to `cur`, `cnt+1` and total+cost from cur to `ith` node (`arr[cur][i]`).

## C++ Implementation

```
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int ans = INT_MAX, n;

bool valid(int i) {
  return i >= 0 && i < n;
}

void traverse(vector<vector<int> >& arr, int cur, vector<int> visited, int cnt, int total) {
  // all nodes are visited
  if(cnt == n) {
    ans = min(ans, total + arr[cur][0]); // add the distance from last node to the 0th node
    return;
  }
  
  // explore all the paths that are not yet visited
  for(int i = 0; i < n; i++) {
    if(!visited[i] && valid(i)) {
      visited[i] = 1;
      traverse(arr, i, visited, cnt+1, total+arr[cur][i]);
      visited[i] = 0; // so that this node can be used in another sequence to check if min cost can be obtained
    }
  }
}

int main() {
  int t;
  cin>>t;
  
  while(t--) {
    cin>>n;
    vector<vector<int> > arr(n, vector<int>(n));
    vector<int> visited(n, 0);
    ans = INT_MAX;
    
    // take the graph input
    for(int i = 0; i < n; i++) {
      for(int j = 0; j < n; j++) {
        cin>>arr[i][j];
      }
    }
    
    visited[0] = 1;
    // check all possible path to find the min cost path
    traverse(arr, 0, visited, 1, 0); 
    
    cout<<ans<<endl;
  }
  return 0;
}
```
**Problem link:** [Travelling Salesman - Target Samsung 13 Nov'19](https://www.hackerrank.com/contests/target-samsung-13-nov19/challenges/travelling-salesman-4)
------