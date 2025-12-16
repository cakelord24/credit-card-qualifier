class SimpleDB {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('cc_users')) || [];
        this.applications = JSON.parse(localStorage.getItem('cc_applications')) || [];
        this.sessions = JSON.parse(localStorage.getItem('cc_sessions')) || [];
        this.cardViews = JSON.parse(localStorage.getItem('cc_cardviews')) || [];
        
        this.creditCards = [
            {
                id: 1,
                name: "Chase Sapphire Preferred",
                issuer: "Chase",
                type: "travel",
                annualFee: 95,
                welcomeBonus: "60,000 points",
                rewards: "3x dining, 2x travel",
                apr: "21.49%-28.49%",
                creditRequired: 670,
                incomeRequired: 30000
            },
            {
                id: 2,
                name: "Chase Sapphire Reserve",
                issuer: "Chase",
                type: "premium",
                annualFee: 550,
                welcomeBonus: "60,000 points",
                rewards: "3x travel, 3x dining",
                apr: "22.49%-29.49%",
                creditRequired: 740,
                incomeRequired: 60000
            },
            {
                id: 3,
                name: "Chase Freedom Unlimited",
                issuer: "Chase",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "1.5% on all purchases",
                apr: "20.49%-29.24%",
                creditRequired: 660,
                incomeRequired: 25000
            },
            {
                id: 4,
                name: "Chase Freedom Flex",
                issuer: "Chase",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "5% rotating categories",
                apr: "20.49%-29.24%",
                creditRequired: 660,
                incomeRequired: 25000
            },
            {
                id: 5,
                name: "Amex Platinum",
                issuer: "American Express",
                type: "premium",
                annualFee: 695,
                welcomeBonus: "80,000 points",
                rewards: "5x flights, 5x hotels",
                apr: "See agreement",
                creditRequired: 700,
                incomeRequired: 60000
            },
            {
                id: 6,
                name: "Amex Gold",
                issuer: "American Express",
                type: "travel",
                annualFee: 250,
                welcomeBonus: "60,000 points",
                rewards: "4x dining, 4x groceries",
                apr: "See agreement",
                creditRequired: 690,
                incomeRequired: 40000
            },
            {
                id: 7,
                name: "Blue Cash Preferred",
                issuer: "American Express",
                type: "cashback",
                annualFee: 95,
                welcomeBonus: "$250 cash back",
                rewards: "6% groceries, 6% streaming",
                apr: "19.24%-29.99%",
                creditRequired: 670,
                incomeRequired: 30000
            },
            {
                id: 8,
                name: "Blue Cash Everyday",
                issuer: "American Express",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "3% groceries, gas, online retail",
                apr: "19.24%-29.99%",
                creditRequired: 660,
                incomeRequired: 25000
            },
            {
                id: 9,
                name: "Capital One Venture X",
                issuer: "Capital One",
                type: "premium",
                annualFee: 395,
                welcomeBonus: "75,000 miles",
                rewards: "10x hotels, 5x flights",
                apr: "20.99%-28.99%",
                creditRequired: 740,
                incomeRequired: 50000
            },
            {
                id: 10,
                name: "Capital One Venture",
                issuer: "Capital One",
                type: "travel",
                annualFee: 95,
                welcomeBonus: "75,000 miles",
                rewards: "2x on all purchases",
                apr: "20.99%-28.99%",
                creditRequired: 690,
                incomeRequired: 35000
            },
            {
                id: 11,
                name: "Capital One Quicksilver",
                issuer: "Capital One",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "1.5% on all purchases",
                apr: "19.99%-29.99%",
                creditRequired: 650,
                incomeRequired: 20000
            },
            {
                id: 12,
                name: "Capital One SavorOne",
                issuer: "Capital One",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "3% dining, entertainment, groceries",
                apr: "19.99%-29.99%",
                creditRequired: 670,
                incomeRequired: 25000
            },
            {
                id: 13,
                name: "Citi Double Cash",
                issuer: "Citi",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "2% on all purchases",
                apr: "19.24%-29.24%",
                creditRequired: 670,
                incomeRequired: 25000
            },
            {
                id: 14,
                name: "Citi Custom Cash",
                issuer: "Citi",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash back",
                rewards: "5% on top spending category",
                apr: "19.24%-29.24%",
                creditRequired: 670,
                incomeRequired: 25000
            },
            {
                id: 15,
                name: "Citi Premier",
                issuer: "Citi",
                type: "travel",
                annualFee: 95,
                welcomeBonus: "60,000 points",
                rewards: "3x travel, gas, dining",
                apr: "21.24%-29.24%",
                creditRequired: 690,
                incomeRequired: 35000
            },
            {
                id: 16,
                name: "Discover it Cash Back",
                issuer: "Discover",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "Cashback Match",
                rewards: "5% rotating categories",
                apr: "17.24%-28.24%",
                creditRequired: 660,
                incomeRequired: 20000
            },
            {
                id: 17,
                name: "Discover it Student Cash Back",
                issuer: "Discover",
                type: "student",
                annualFee: 0,
                welcomeBonus: "Cashback Match",
                rewards: "5% rotating categories",
                apr: "17.24%-28.24%",
                creditRequired: 600,
                incomeRequired: 0
            },
            {
                id: 18,
                name: "Wells Fargo Active Cash",
                issuer: "Wells Fargo",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash rewards",
                rewards: "2% on all purchases",
                apr: "20.24%-29.99%",
                creditRequired: 670,
                incomeRequired: 25000
            },
            {
                id: 19,
                name: "Wells Fargo Autograph",
                issuer: "Wells Fargo",
                type: "travel",
                annualFee: 95,
                welcomeBonus: "50,000 points",
                rewards: "3x dining, travel, transit",
                apr: "21.24%-28.74%",
                creditRequired: 680,
                incomeRequired: 30000
            },
            {
                id: 20,
                name: "Wells Fargo Propel",
                issuer: "Wells Fargo",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash",
                rewards: "3% gas, transit, streaming",
                apr: "20.24%-29.99%",
                creditRequired: 670,
                incomeRequired: 25000
            },
            {
                id: 21,
                name: "Barclays Uber",
                issuer: "Barclays",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$100 bonus",
                rewards: "4% dining, 3% travel",
                apr: "19.99%-29.99%",
                creditRequired: 680,
                incomeRequired: 30000
            },
            {
                id: 22,
                name: "Barclays Arrival Plus",
                issuer: "Barclays",
                type: "travel",
                annualFee: 95,
                welcomeBonus: "60,000 miles",
                rewards: "2x travel, 1x all",
                apr: "20.99%-29.99%",
                creditRequired: 680,
                incomeRequired: 35000
            },
            {
                id: 23,
                name: "Barclays CashForward",
                issuer: "Barclays",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 cash",
                rewards: "1.5% on all purchases",
                apr: "19.99%-29.99%",
                creditRequired: 650,
                incomeRequired: 25000
            },
            {
                id: 24,
                name: "BankAmericard Cash Rewards",
                issuer: "Bank of America",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$100 bonus",
                rewards: "1% cash",
                apr: "19.74%-29.74%",
                creditRequired: 650,
                incomeRequired: 20000
            },
            {
                id: 25,
                name: "Bank of America Travel Rewards",
                issuer: "Bank of America",
                type: "travel",
                annualFee: 0,
                welcomeBonus: "25,000 points",
                rewards: "1.5x travel",
                apr: "19.74%-29.74%",
                creditRequired: 650,
                incomeRequired: 20000
            },
            {
                id: 26,
                name: "Chase Ink Business Preferred",
                issuer: "Chase",
                type: "business",
                annualFee: 95,
                welcomeBonus: "100,000 points",
                rewards: "3x on categories",
                apr: "23.99%-29.99%",
                creditRequired: 700,
                incomeRequired: 40000
            },
            {
                id: 27,
                name: "Chase Ink Unlimited",
                issuer: "Chase",
                type: "business",
                annualFee: 0,
                welcomeBonus: "$500 cash",
                rewards: "1.5% all purchases",
                apr: "21.99%-29.99%",
                creditRequired: 680,
                incomeRequired: 30000
            },
            {
                id: 28,
                name: "American Express Business Gold",
                issuer: "American Express",
                type: "business",
                annualFee: 295,
                welcomeBonus: "75,000 points",
                rewards: "4x on categories",
                apr: "See agreement",
                creditRequired: 700,
                incomeRequired: 50000
            },
            {
                id: 29,
                name: "Capital One Spark Cash Plus",
                issuer: "Capital One",
                type: "business",
                annualFee: 0,
                welcomeBonus: "$500 bonus",
                rewards: "2% all purchases",
                apr: "20.49%-28.49%",
                creditRequired: 670,
                incomeRequired: 25000
            },
            {
                id: 30,
                name: "Secured Mastercard",
                issuer: "Capital One",
                type: "secured",
                annualFee: 0,
                welcomeBonus: "None",
                rewards: "No rewards",
                apr: "26.99%",
                creditRequired: 300,
                incomeRequired: 0
            },
            {
                id: 31,
                name: "OpenSky Secured Card",
                issuer: "OpenSky",
                type: "secured",
                annualFee: 35,
                welcomeBonus: "None",
                rewards: "No rewards",
                apr: "19.99%-24.99%",
                creditRequired: 300,
                incomeRequired: 0
            },
            {
                id: 32,
                name: "Citi Secured Mastercard",
                issuer: "Citi",
                type: "secured",
                annualFee: 0,
                welcomeBonus: "None",
                rewards: "No rewards",
                apr: "22.99%",
                creditRequired: 300,
                incomeRequired: 0
            },
            {
                id: 33,
                name: "U.S. Bank Altitude Go",
                issuer: "U.S. Bank",
                type: "travel",
                annualFee: 0,
                welcomeBonus: "$200 bonus",
                rewards: "4x dining",
                apr: "19.24%-29.24%",
                creditRequired: 680,
                incomeRequired: 30000
            },
            {
                id: 34,
                name: "U.S. Bank Altitude Reserve",
                issuer: "U.S. Bank",
                type: "premium",
                annualFee: 400,
                welcomeBonus: "50,000 points",
                rewards: "3x mobile wallet",
                apr: "20.49%-28.49%",
                creditRequired: 740,
                incomeRequired: 60000
            },
            {
                id: 35,
                name: "Apple Card",
                issuer: "Goldman Sachs",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "Daily Cash",
                rewards: "2% Apple Pay, 3% Apple",
                apr: "19.24%-29.49%",
                creditRequired: 660,
                incomeRequired: 25000
            },
            {
                id: 36,
                name: "Amazon Prime Rewards Visa",
                issuer: "Chase",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$150 Amazon gift card",
                rewards: "5% Amazon, Whole Foods",
                apr: "19.49%-28.49%",
                creditRequired: 670,
                incomeRequired: 30000
            },
            {
                id: 37,
                name: "PayPal Cashback Mastercard",
                issuer: "Synchrony",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$100 bonus",
                rewards: "2% on all purchases",
                apr: "19.24%-29.24%",
                creditRequired: 650,
                incomeRequired: 20000
            },
            {
                id: 38,
                name: "SoFi Credit Card",
                issuer: "SoFi",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 bonus",
                rewards: "2% unlimited cash back",
                apr: "18.24%-29.99%",
                creditRequired: 680,
                incomeRequired: 30000
            },
            {
                id: 39,
                name: "Petal 2 Visa",
                issuer: "Petal",
                type: "starter",
                annualFee: 0,
                welcomeBonus: "None",
                rewards: "1–1.5% cash back",
                apr: "18.24%-29.49%",
                creditRequired: 600,
                incomeRequired: 0
            },
            {
                id: 40,
                name: "Petal 1 Visa",
                issuer: "Petal",
                type: "starter",
                annualFee: 0,
                welcomeBonus: "None",
                rewards: "No rewards",
                apr: "19.24%-29.49%",
                creditRequired: 580,
                incomeRequired: 0
            },
            {
                id: 41,
                name: "Deserve EDU Mastercard",
                issuer: "Deserve",
                type: "student",
                annualFee: 0,
                welcomeBonus: "None",
                rewards: "1% cash back",
                apr: "18.24%-25.24%",
                creditRequired: 580,
                incomeRequired: 0
            },
            {
                id: 42,
                name: "Capital One Journey",
                issuer: "Capital One",
                type: "student",
                annualFee: 0,
                welcomeBonus: "None",
                rewards: "1% cash back",
                apr: "26.99%",
                creditRequired: 580,
                incomeRequired: 0
            },
            {
                id: 43,
                name: "Bank of America Unlimited Cash",
                issuer: "Bank of America",
                type: "cashback",
                annualFee: 0,
                welcomeBonus: "$200 bonus",
                rewards: "1.5% on all purchases",
                apr: "18.74%-28.74%",
                creditRequired: 660,
                incomeRequired: 25000
            },
            {
                id: 44,
                name: "Bank of America Premium Rewards",
                issuer: "Bank of America",
                type: "travel",
                annualFee: 95,
                welcomeBonus: "50,000 points",
                rewards: "2x travel & dining",
                apr: "20.24%-28.24%",
                creditRequired: 700,
                incomeRequired: 40000
            },
            {
                id: 45,
                name: "Citi Low APR MasterCard",
                issuer: "Citi",
                type: "low_apr",
                annualFee: 0,
                welcomeBonus: "0% APR 12 months",
                rewards: "No rewards",
                apr: "11.99%-21.99%",
                creditRequired: 700,
                incomeRequired: 40000
            }
        ];
    }
    
    async hashPassword(password) {
        const salt = this.generateSalt();
        const hashed = this.simpleHash(password + salt);
        return `${salt}$${hashed}`;
    }
    
    generateSalt() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }
    
    async verifyPassword(input, stored) {
        const parts = stored.split('$');
        const salt = parts[0];
        const storedHash = parts[1];
        const inputHash = this.simpleHash(input + salt);
        return inputHash === storedHash;
    }
    
    findUser(email) {
        return this.users.find(user => user.email === email);
    }

    findUserById(userId) {
        return this.users.find(user => user.id === userId);
    }
    
    createUser(userData) {
        const newUser = {
            id: this.users.length + 1,
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
        this.save();
        return newUser;
    }
    
    createApplication(userId, cardId, approvalOdds, userCreditScore = null) {
        const card = this.creditCards.find(c => c.id === cardId);
        const user = this.findUserById(userId);
        const creditScore = userCreditScore || (user ? user.creditScore : 300);
        const income = user ? user.annualIncome : 0;
        
        let status = 'declined';
        
        if (creditScore < card.creditRequired || income < card.incomeRequired) {
            status = 'declined';
        } else {
            status = this.determineApprovalStatus(approvalOdds);
        }
        
        const application = {
            id: this.applications.length + 1,
            userId,
            cardId,
            approvalOdds,
            status: status,
            date: new Date().toISOString()
        };
        this.applications.push(application);
        this.save();
        return application;
    }

    canReapply(userId, cardId) {
        const applications = this.applications.filter(app => app.userId === userId && app.cardId === cardId);
        if (applications.length === 0) return true;
        
        const lastApplication = applications[applications.length - 1];
        const lastApplicationTime = new Date(lastApplication.date);
        const now = new Date();
        const hoursDifference = (now - lastApplicationTime) / (1000 * 60 * 60);
        
        return hoursDifference >= 0;
    }

    getReapplyWaitTime(userId, cardId) {
        const applications = this.applications.filter(app => app.userId === userId && app.cardId === cardId);
        if (applications.length === 0) return 0;
        
        const lastApplication = applications[applications.length - 1];
        const lastApplicationTime = new Date(lastApplication.date);
        const now = new Date();
        const hoursDifference = (now - lastApplicationTime) / (1000 * 60 * 60);
        
        if (hoursDifference >= 0) return 0;
        return Math.ceil(12 - hoursDifference);
    }
    
    determineApprovalStatus(approvalOdds) {
        const baseRandom = Math.random() * 100;
        
        if (baseRandom < approvalOdds) {
            return 'approved';
        } else {
            return 'declined';
        }
    }
    
    getUserApplications(userId) {
        return this.applications.filter(application => application.userId === userId);
    }

    trackCardView(userId, cardId) {
        const existingView = this.cardViews.find(v => v.userId === userId && v.cardId === cardId);
        if (!existingView) {
            this.cardViews.push({
                userId,
                cardId,
                viewedAt: new Date().toISOString()
            });
            this.save();
        }
    }

    getCardViewCount(userId) {
        return this.cardViews.filter(v => v.userId === userId).length;
    }
    
    updateUser(userId, updates) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            Object.assign(user, updates);
            this.save();
            return user;
        }
        return null;
    }
    
    save() {
        localStorage.setItem('cc_users', JSON.stringify(this.users));
        localStorage.setItem('cc_applications', JSON.stringify(this.applications));
        localStorage.setItem('cc_sessions', JSON.stringify(this.sessions));
        localStorage.setItem('cc_cardviews', JSON.stringify(this.cardViews));
    }
}

const db = new SimpleDB();
