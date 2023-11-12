//import '../css/admin.css';

const admin = () => {
    return (
        <div className="page admin">
            <div class="container" id="container">
                <div class="side-menu">
                    <ul>
                        <li><a href="https://www.google.com">College of Engineering</a></li>
                        <li><a href="https://www.google.com">College of Computing and Information Technology</a></li>
                        <li><a href="https://www.google.com">College of Arts and Sciences</a></li>
                        <li><a href="https://www.google.com">College of Arts and Sciences</a></li>
                        <li><a href="https://www.google.com">College of Education</a></li>
                        <li><a href="https://www.google.com">College of Health and Sciences</a></li>
                    </ul>
                </div>

                <div class="container">
                    <div class="card">
                        <div class="cardImg">
                            <img src="../src/img/Maricel.png" alt=""></img>
                        </div>
                        <div class="content">
                            <h2>Maricel Gaspar</h2>
                            <p>Select a course:</p>
                            <select id="courseDropdown">
                                <option value="course1">ITECC05</option>
                                <option value="course2">LINALGE</option>
                                <option value="course3">INTCAL</option>
                            </select>
                        </div>
                    </div>

                    <div class="card">
                        <div class="cardImg">
                            <img src="../src/img/Jerwin.png" alt=""></img>
                        </div>
                        <div class="content">
                            <h2>Jerwin Cruz</h2>
                            <p>Select a course:</p>
                            <select id="courseDropdown">
                                <option value="course1">ITECC01</option>
                                <option value="course2">DIFCAL</option>
                                <option value="course3">GEEMIND</option>
                            </select>
                        </div>
                    </div>

                    <div class="card">
                        <div class="cardImg">
                            <img src="../src/img/Bryce.png" alt=""></img>
                        </div>
                        <div class="content">
                            <h2>Bryce Briones</h2>
                            <p>Select a course:</p>
                            <select id="courseDropdown">
                                <option value="course1">GEARTS</option>
                                <option value="course2">CSOS</option>
                                <option value="course3">JRIZ</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default admin