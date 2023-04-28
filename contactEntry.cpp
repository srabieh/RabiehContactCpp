#include "contactEntry.h"

contactEntry::contactEntry() {
}

contactEntry::contactEntry(sql::SQLString f, sql::SQLString l, sql::SQLString p, sql::SQLString t, sql::SQLString e, sql::SQLString s, sql::SQLString m, sql::SQLString y, sql::SQLString I) {
    first = f;
    last = l;
    phone = p;
    type = t;
    email = e;
    SSN = s;
    meal = m;
    yakarma = y;
    ID=I;
}

string contactEntry::text() {
	string result = ID + ". ";
	result += first + " ";
	result += last + " ";
	result += phone + " ";
	result += email + " ";
	result += SSN + " ";
	result += meal + " ";
	result += yakarma + " ";
	result += type;
	return result;

}

string contactEntry::json() {
	string result = "{\"ID\":\"" + ID + "\",";
	result += "\"First\":\"" + first + "\",";
	result += "\"Last\":\"" + last + "\",";
	result += "\"Phone\":\"" + phone + "\",";
	result += "\"Type\":\"" + type + "\",";
	result += "\"Email\":\"" + email + "\",";
	result += "\"SSN\":\"" + SSN + "\",";
	result += "\"Meal_Plan\":\"" + meal + "\",";
	result += "\"Yakarma\":\"" + yakarma + "\"}";
	return result;

}
