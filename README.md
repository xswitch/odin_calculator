# odin_calculator

Loop through operators and add event listeners that change
operator variable to said operators value.
check if there is a number in first number before allowing operator to be selected.


Process:
Select first number. Cant equal 0.
---
Select operator. Only if firstNumber is not 0 or undefined. Stores firstNumber.
---
select second number. If firstNumber is not 0 then set second number.
---
Select another operator if not "=" set result as first number and operator as current operator then go directly to step 3 and reset secondNumber.
else show results and reset operator and secondNumber variables.

number pressed -> store value
operator pressed -> store second value