# pip install -U googlemaps


import googlemaps

def get_distance(api_key, origin, destination, mode='driving'):
    gmaps = googlemaps.Client(key=api_key)
    
    # Get directions
    directions_result = gmaps.directions(origin, destination, mode=mode)

    # Extract distance in meters
    distance_meters = directions_result[0]['legs'][0]['distance']['value']

    # Convert distance to kilometers
    distance_kilometers = distance_meters / 1000

    return distance_kilometers

def calculate_fare(distance, rate_per_kilometer):
    # Replace this with your fare calculation logic
    fare = distance * rate_per_kilometer
    return fare

def main():
    # Replace 'YOUR_API_KEY' with your actual Google Maps API key
    api_key = 'AIzaSyDwaXa3JZsFqv71812tm1k5FokRzLrX0RM'
    
    # Example locations (replace with your actual locations)
    origin = 'vikhroli'
    destination = 'ghatkopar'
    
    # Set your rate per kilometer
    rate_per_kilometer = 8  # Replace with your actual rate
    
    # Get distance
    distance = get_distance(api_key, origin, destination)

    # Calculate fare
    fare = calculate_fare(distance, rate_per_kilometer)

    print(f"Distance: {distance} km")
    print(f"Fare:INR {fare:.2f}")

if __name__ == "__main__":
    main()
