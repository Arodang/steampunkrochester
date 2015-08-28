﻿(function () {
	"use strict";
	var app = angular.module("steampunkRochester", []);

	var nameGenController = app.controller("nameGenController", ["$scope", "nameGenService", function ($scope, nameGenService) {
	    $scope.numNamesToGen = 5;
	    $scope.generateNames = function () {
	        $scope.listOfNames = nameGenService.generateName($scope.numNamesToGen, $scope.nameGender);
	    };
	    
	}]);

	var nameGenService = app.factory("nameGenService", [function () {
	    //Including giant list of names here to avoid cross-domain call errors since we aren't hosting a server
	    //First names from http://www.ssa.gov/oact/babynames/decades/names1920s.html
	    //Last names from http://www.mifamilyhistory.org/mimack/census/1920surnameEngadine.asp
	    var lastNames = ["Abraham", "Elliott", "Kegley", "Raslo", "Adler", "Elsner", "Kinney", "Razner", "Allen", "English", "Kisro", "Renaldt", "Ankins", "Ernlaid", "Kleeman", "Rifenberg", "Arandt", "Fahlett", "Riley", "Arthur", "Fanbrick", "Leach", "Ripley", "Avery", "Fandrick", "Lehman", "Rosental", "Baker", "Farwell", "Len", "Rossini", "Barnham", "Feigel", "Lesatz", "Russell", "Basis", "Felten", "Levard", "Sawyer", "Belanger", "Fenske", "Lindh", "Schiltgan", "Bentz", "Fergin", "Lraise", "Schiltzen", "Bessler", "Feigel", "Luckstrim", "Schliske", "Best", "Fillman", "Lynch", "Schmidt", "Bevard", "Finley", "Madison", "School", "Bhenki", "Firske", "Manse", "Schroeder", "Blakely", "Flatt", "Mantei", "Schuthosk", "Bleeker", "Floria", "Marcus", "Schwarm", "Bouche", "Fralich", "Markus", "Schwartz", "Boursaw", "Fralich", "Markwart", "Shane", "Brant", "Franklin", "Matchinski", "Shattuck", "Brawley", "Freeman", "Mathews", "Shaw", "Bretz", "Frisbe", "McAlpine", "Simmons", "Brock", "Furlong", "McBurney", "Slack", "Brockman", "Gager", "McCarney", "Smith", "Bruce", "Garvin", "McCown", "Speltzer", "Buchman", "Germain", "McCutchen", "Burnett", "Gohl", "McCutcheon", "Stewart", "Burnette", "Goodwin", "McDonald", "Stimac", "Burns", "Gray", "McGraw", "Strenburg", "Buss", "Greenwald", "Merrick", "Strong", "Butterfield", "Greenwalt", "Metic", "Stroshine", "Caffey", "Griffen", "Molzan", "Swanson", "Cantin", "Griffith", "Mondt", "Syveran", "Christopher", "Hahn", "Morris", "Tenker", "Click", "Halsted", "Moses", "Thomas", "Codere", "Hammermeister", "Neyenquam", "Traver", "Collins", "Hancock", "Nickels", "Urton", "Coutu", "Harmal", "Norval", "Vallier", "Cowell", "Hass", "Wagner", "Cowman", "Hastings", "Olson", "Wall", "Crankovitch", "Hayes", "Walsted", "Cuthburt", "Heminger", "Warner", "Cuttling", "Henchal", "Ozanich", "Webber", "Darwin", "Hessen", "Pantiel", "Welch", "Davis", "Hidland", "Patterson", "Wentlandt", "Dorman", "Hilt", "Patzer", "Westin", "Drafs", "Hogue", "Peppin", "White", "Drefs", "Hollister", "Perkins", "Wilkilgon", "Eakley", "Hollman", "Porter", "Wiltsey", "Eddie", "Howell", "Posch", "Winters", "Hyde", "Price", "Woods", "Proton", "Yeske", "Rapin", "Zibart", "Rapp"]
	    var maleNames = ["Robert", "John", "James", "William", "Charles", "George", "Joseph", "Richard", "Edward", "Donald", "Thomas", "Frank", "Harold", "Paul", "Raymond", "Walter", "Jack", "Henry", "Kenneth", "Arthur", "Albert", "David", "Harry", "Eugene", "Ralph", "Howard", "Carl", "Willie", "Louis", "Clarence", "Earl", "Roy", "Fred", "Joe", "Francis", "Lawrence", "Herbert", "Leonard", "Ernest", "Alfred", "Anthony", "Stanley", "Norman", "Gerald", "Daniel", "Samuel", "Bernard", "Billy", "Melvin", "Marvin", "Warren", "Michael", "Leroy", "Russell", "Leo", "Andrew", "Edwin", "Elmer", "Peter", "Floyd", "Lloyd", "Ray", "Frederick", "Theodore", "Clifford", "Vernon", "Herman", "Clyde", "Chester", "Philip", "Alvin", "Lester", "Wayne", "Vincent", "Gordon", "Leon", "Lewis", "Charlie", "Glenn", "Calvin", "Martin", "Milton", "Lee", "Jesse", "Dale", "Cecil", "Bill", "Harvey", "Roger", "Victor", "Benjamin", "Wallace", "Ronald", "Sam", "Allen", "Arnold", "Willard", "Gilbert", "Edgar", "Oscar", "Gene", "Jerry", "Douglas", "Johnnie", "Claude", "Don", "Eddie", "Roland", "Everett", "Maurice", "Curtis", "Marion", "Virgil", "Wilbur", "Manuel", "Stephen", "Jerome", "Homer", "Leslie", "Glen", "Jessie", "Hubert", "Jose", "Jimmie", "Sidney", "Morris", "Hugh", "Max", "Bobby", "Bob", "Nicholas", "Luther", "Bruce", "Junior", "Wesley", "Rudolph", "Alexander", "Franklin", "Tom", "Irving", "Horace", "Willis", "Patrick", "Steve", "Johnny", "Dean", "Julius", "Keith", "Oliver", "Earnest", "Ben", "Jim", "Tony", "Edmund", "Lyle", "Guy", "Salvatore", "Orville", "Delbert", "Billie", "Phillip", "Clayton", "Otis", "Archie", "Alex", "Angelo", "Mike", "Jacob", "Clifton", "Bennie", "Matthew", "Duane", "Clinton", "Dennis", "Wilbert", "Dan", "Jay", "Marshall", "Leland", "Merle", "Ira", "Nathaniel", "Ivan", "Ervin", "Jimmy", "Irvin", "Alton", "Lowell", "Dewey", "Larry", "Emil", "Antonio", "Wilfred", "Elbert", "Juan", "Alan", "Allan", "Lonnie", "Nelson", "Forrest"]
	    var femaleNames = ["Mary", "Dorothy", "Helen", "Betty", "Margaret", "Ruth", "Virginia", "Doris", "Mildred", "Frances", "Elizabeth", "Evelyn", "Anna", "Marie", "Alice", "Jean", "Shirley", "Barbara", "Irene", "Marjorie", "Florence", "Lois", "Martha", "Rose", "Lillian", "Louise", "Catherine", "Ruby", "Eleanor", "Patricia", "Gladys", "Annie", "Josephine", "Thelma", "Edna", "Norma", "Pauline", "Lucille", "Edith", "Gloria", "Ethel", "Phyllis", "Grace", "Hazel", "June", "Bernice", "Marion", "Dolores", "Rita", "Lorraine", "Ann", "Esther", "Beatrice", "Juanita", "Clara", "Jane", "Geraldine", "Sarah", "Emma", "Joan", "Joyce", "Nancy", "Katherine", "Gertrude", "Elsie", "Julia", "Agnes", "Wilma", "Marian", "Bertha", "Eva", "Willie", "Audrey", "Theresa", "Vivian", "Wanda", "Laura", "Charlotte", "Ida", "Elaine", "Anne", "Marilyn", "Kathryn", "Maxine", "Kathleen", "Viola", "Pearl", "Vera", "Bessie", "Myrtle", "Alma", "Beverly", "Violet", "Nellie", "Ella", "Lillie", "Jessie", "Jeanne", "Eileen", "Ellen", "Lucy", "Minnie", "Sylvia", "Donna", "Leona", "Rosemary", "Stella", "Mattie", "Margie", "Genevieve", "Mabel", "Janet", "Geneva", "Georgia", "Bonnie", "Carol", "Velma", "Lena", "Carolyn", "Mae", "Jennie", "Maria", "Christine", "Arlene", "Peggy", "Marguerite", "Opal", "Sara", "Loretta", "Harriet", "Rosa", "Muriel", "Eunice", "Jeanette", "Blanche", "Carrie", "Emily", "Beulah", "Billie", "Dora", "Roberta", "Hilda", "Naomi", "Anita", "Jacqueline", "Alberta", "Inez", "Delores", "Fannie", "Hattie", "Lula", "Verna", "Cora", "Constance", "Madeline", "Miriam", "Ada", "Claire", "Mamie", "Lola", "Rosie", "Erma", "Rachel", "Mable", "Flora", "Daisy", "Sally", "Marcella", "Bette", "Olga", "Caroline", "Laverne", "Sophie", "Nora", "Rebecca", "Estelle", "Irma", "Susie", "Eula", "Winifred", "Eloise", "Janice", "Maggie", "Antoinette", "Nina", "Rosalie", "Imogene", "Lorene", "Olive", "Sadie", "Regina", "Victoria", "Henrietta", "Della", "Bettie", "Lila", "Fern", "Faye", "Johnnie", "Jeannette"]

        //Takes int>1 to generate, gender enum (1 male, 2 female, 3 both)
	    //Returns a [] of names.
	    var publicGenerateName = function (numberToGenerate, gender) {
	        var listOfNames = [];
	        for (var i = 0; i < numberToGenerate; i++) {
	            var firstName = "";
	            var lastName = lastNames[privateGenerateRandomValue(0, lastNames.length)];

                //Male
	            if (gender === 1) {
	                firstName = maleNames[privateGenerateRandomValue(0, maleNames.length)];
	            }
                //Female
	            else if (gender === 2) {
	                firstName = femaleNames[privateGenerateRandomValue(0, femaleNames.length)];
	            }
                //Both
	            else {
	                if (privateGenerateRandomValue(0, 2) === 0) {
	                    firstName = maleNames[privateGenerateRandomValue(0, maleNames.length)];
	                }
	                else {
	                    firstName = femaleNames[privateGenerateRandomValue(0, femaleNames.length)];
	                }
	            }

	            listOfNames.push(firstName + " " + lastName);
	        }
	        return listOfNames;
	    };

	    var privateGenerateRandomValue = function(min, max) {
	        return Math.floor(Math.random() * (max - min)) + min;
	    };


	    return {
	        generateName: publicGenerateName
	    };
	    
	    
	}]);
	
})();
