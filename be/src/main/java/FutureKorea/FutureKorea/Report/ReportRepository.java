package FutureKorea.FutureKorea.Report;

import FutureKorea.FutureKorea.Report.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByTitle(String title);
}