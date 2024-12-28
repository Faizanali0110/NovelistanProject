
#!/bin/bash

# Array of commit messages
commit_messages=(
    "Update documentation"
    "Fix bug in main module"
    "Add new feature"
    "Refactor code"
    "Optimize performance"
    "Update dependencies"
    "Fix typo"
    "Add unit tests"
    "Improve error handling"
    "Clean up code"
)

# Array of authors
authors=(
    "Faizan Ali 01-131222-017@student.bahria.edu.pk"
    "Salahdduin Sani salahuddinsani10@gmail.com"
)

# Function to generate random date between Nov and Dec 2024
generate_random_date() {
    # Random day between 1-30 for November, 1-25 for December
    local month=$((RANDOM % 2 + 11))
    local max_day=30
    if [ $month -eq 12 ]; then
        max_day=25
    fi
    local day=$((RANDOM % max_day + 1))
    
    # Random hour and minute
    local hour=$((RANDOM % 24))
    local minute=$((RANDOM % 60))
    
    # Format date string
    printf "2024-%02d-%02d %02d:%02d:00" $month $day $hour $minute
}

# Number of commits to generate
num_commits=50

# Generate commits
for ((i=1; i<=num_commits; i++)); do
    # Get random message and author
    message=${commit_messages[$((RANDOM % ${#commit_messages[@]}))]}
    author=${authors[$((RANDOM % ${#authors[@]}))]}
    
    # Generate date
    date=$(generate_random_date)
    

    # Create empty commit with specified date and author
    export GIT_AUTHOR_DATE="$date"
    export GIT_COMMITTER_DATE="$date"
    export GIT_AUTHOR_NAME=$(echo $author | cut -d '<' -f1)
    export GIT_AUTHOR_EMAIL=$(echo $author | grep -o '<[^>]*>' | tr -d '<>')
    export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
    export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
    
    # Create empty file with random name
    filename="file_$((RANDOM % 1000)).txt"
    echo "Update $i" > $filename
    
    # Stage and commit
    git add $filename
    git commit -m "$message"
done

# Reset environment variables
unset GIT_AUTHOR_DATE GIT_COMMITTER_DATE
unset GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL
unset GIT_COMMITTER_NAME GIT_COMMITTER_EMAIL
