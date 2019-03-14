import math
import os
import random
import re
import sys


# Complete the repair_machine function below.
def repair_machine(network, initial_machines):
    after_repair = []
 def num_infected(network, infected_machines):
        newly_infected = []
        final_infected = set()
 while (len(infected_machines) != 0):
 print(len(infected_machines))
 for machine in infected_machines:
                final_infected.add(machine)
 for i in range(len(network[machine])):
 if (network[machine][i] == 1 and i != machine and i not in final_infected):
                        newly_infected.append(i)
                        final_infected.add(i)
            infected_machines = newly_infected
            newly_infected = []
 return len(final_infected)
    initial_infected = num_infected(network, initial_machines)
 for item in initial_machines:
        without_item = initial_machines
        without_item.remove(item)
        after_repair.append(num_infected(network, without_item))
    repair_difference = [item - initial_infected for item in after_repair]
    minimum = min(repair_difference)
    machine_index = repair_difference.index(minimum)
 return [initial_machines[machine_index], abs(minimum)]
