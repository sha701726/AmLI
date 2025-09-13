def calculate_fare(distance_km, max_distance=800):
    """
    Calculate total fare for a given distance (km) using the slab model:
    - Slab 1: 10 km, rate = base_rate + increment(=1)
    - Slab 2: 20 km, rate = previous_rate + increment(=1.5)
    - Slab 3: 30 km, rate = previous_rate + increment(=2.0)
    - ... slab n size = n * 10 km
    - increments start at 1.0 and increase by 0.5 each slab
    - base_rate starts at 5.0

    Returns: (total_fare, slab_details)
      slab_details: list of tuples (slab_index, km_taken_in_slab, rate_per_km, slab_fare, cumulative_fare)
    """
    km = distance_km
    if distance_km <= 0:
        return 0.0, []
    distance_km = min(distance_km, max_distance)  # cap to max_distance
    base_rate = 5
    increment = 1.0
    total_fare = 0.0
    covered = 0.0
    slab_index = 1
    slab_details = []
    
    while covered < distance_km:
        slab_size = slab_index * 5.0
        remaining = distance_km - covered
        take = min(slab_size, remaining)
        effective_rate = base_rate + increment
        slab_fare = take * effective_rate
        total_fare += slab_fare
        covered += take
        
        slab_details.append((slab_index, take, effective_rate, slab_fare, total_fare))
        
        # prepare next slab
        base_rate = effective_rate
        increment += 0.5
        slab_index += 1
        
    return total_fare + (km * 5.55), slab_details

# Example usage:
distance = float(input("Enter the distance in kilometers: "))  # change this to any km you want (<=800)
fare, details = calculate_fare(distance)
print(f"Total fare for {distance} km = ₹{fare:.2f}")
print("Breakdown:")
for idx, take, rate, slab_fare, cum in details:
    print(f" Slab {idx}: {take} km @ ₹{rate}/km => slab fare ₹{slab_fare:.2f}  (cumulative ₹{cum:.2f})")