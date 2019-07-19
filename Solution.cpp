#include <bits/stdc++.h>
using namespace std;

int dp[2][4][6][8];

int sol(vector < int > a){
	if(dp[a[0]][a[1]][a[2]][a[3]] != -1) return dp[a[0]][a[1]][a[2]][a[3]];
	int ans = 0;
	for(int ind = 0; ind < 4; ind++){
		for(int i = 1; i <= a[ind]; i++){
			a[ind] -= i;
			ans = ans|sol(a);
			a[ind] += i;
		}
	}
	ans = 1 - ans;
	dp[a[0]][a[1]][a[2]][a[3]] = ans;
	return ans;
}

int main(){

	cout << "You need to play second if you want to win." << endl;

	memset(dp, -1, sizeof(dp));
	dp[0][0][0][0] = 0;
		
	vector < int > v;
	v.push_back(1); v.push_back(3); v.push_back(5); v.push_back(7);
	sol(v);

	v.clear();
	int x;
	cout << "Enter the number of marbles in each row :" << endl; 
	for(int i = 0; i < 4; i++){
		cout << "Row " << i + 1 <<" : ";
		cin >> x;
		v.push_back(x);
	}

	vector < pair < int, int >> possible_moves;

	for(int ind = 0; ind < 4; ind++){
		for(int i = 1; i <= v[ind]; i++){
			v[ind] -= i;
			if(sol(v)){
				possible_moves.push_back({ind, i});
			}
			v[ind] += i;
		}
	}

	if(possible_moves.size() == 0){
		cout << "You will lose buddy.." << endl;
		return 0;
	}

	int j = rand()%(possible_moves.size());

	cout << "Remove " << possible_moves[j].second <<" marbles from row " << possible_moves[j].first + 1 <<  "."<<endl;

	return 0;
}