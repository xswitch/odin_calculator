# odin_calculator

Loop through operators and add event listeners that change
operator variable to said operators value.
check if there is a number in first number before allowing operator to be selected.


BUGS TO FIX
# Operator can be set while number is 0
 -> Another check should do it

# Only the first number can use decimals
 -> if storedNumber is not 0 check after operator for a decimal.

# toFixed only if needed.
 -> toFixed in operate function
 -> compare result before returning
 -> Use modulus to check if anything remains, if so return toFixed